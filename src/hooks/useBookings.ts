import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/helpers';

type SeasonalPrice = Tables<'seasonal_prices'>;
type BlockedDate = Tables<'blocked_dates'>;

interface BookingAvailability {
  id: string;
  check_in: string;
  check_out: string;
  status: string | null;
}

// Fetch available dates for booking calendar
export function useAvailability() {
  const [bookings, setBookings] = useState<BookingAvailability[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const fetchAvailability = async () => {
      try {
        setLoading(true);
        
        // Fetch confirmed bookings
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('id, check_in, check_out, status')
          .in('status', ['confirmed', 'pending']);
        
        if (bookingsError) throw bookingsError;
        
        // Fetch blocked dates from iCal sync
        const { data: blockedData, error: blockedError } = await supabase
          .from('blocked_dates')
          .select('*');
        
        if (blockedError) throw blockedError;
        
        setBookings(bookingsData ?? []);
        setBlockedDates(blockedData ?? []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch availability'));
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  const isDateBlocked = useCallback((date: Date): boolean => {
    const dateStr = date.toISOString().split('T')[0];
    
    // Check bookings
    for (const booking of bookings) {
      if (dateStr >= booking.check_in && dateStr < booking.check_out) {
        return true;
      }
    }
    
    // Check blocked dates from iCal
    for (const blocked of blockedDates) {
      if (dateStr >= blocked.start_date && dateStr < blocked.end_date) {
        return true;
      }
    }
    
    return false;
  }, [bookings, blockedDates]);

  return { bookings, blockedDates, isDateBlocked, loading, error };
}

// Fetch seasonal prices
export function useSeasonalPrices() {
  const [prices, setPrices] = useState<SeasonalPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const fetchPrices = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('seasonal_prices')
          .select('*')
          .eq('is_active', true)
          .order('start_date', { ascending: true });
        
        if (fetchError) throw fetchError;
        setPrices(data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch prices'));
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const getPriceForDate = useCallback((date: Date): number | null => {
    const dateStr = date.toISOString().split('T')[0];
    
    for (const price of prices) {
      if (dateStr >= price.start_date && dateStr <= price.end_date) {
        return price.price_per_night;
      }
    }
    
    return null;
  }, [prices]);

  return { prices, getPriceForDate, loading, error };
}

// Calculate total price for a booking
export function useBookingPrice(checkIn: Date | null, checkOut: Date | null) {
  const { prices, getPriceForDate } = useSeasonalPrices();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [nights, setNights] = useState<number>(0);

  useEffect(() => {
    if (!checkIn || !checkOut || checkIn >= checkOut) {
      setTotalPrice(0);
      setNights(0);
      return;
    }

    let total = 0;
    let nightCount = 0;
    const current = new Date(checkIn);
    
    while (current < checkOut) {
      const price = getPriceForDate(current);
      if (price !== null) {
        total += price;
        nightCount++;
      }
      current.setDate(current.getDate() + 1);
    }
    
    setTotalPrice(total);
    setNights(nightCount);
  }, [checkIn, checkOut, getPriceForDate]);

  return { totalPrice, nights, prices };
}
