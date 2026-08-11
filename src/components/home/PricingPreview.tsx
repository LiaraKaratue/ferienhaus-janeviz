import { Link } from 'react-router';
import { CalendarDays, Info, Check, Waves } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSeasonalPrices } from '@/hooks/useBookings';
import { formatCurrency, formatDate } from '@/lib/utils';

export function PricingPreview() {
  const { prices, loading } = useSeasonalPrices();

  const displayPrices = prices.length > 0 ? prices : [
  { id: '1', name: 'Nebensaison', start_date: '2024-10-15', end_date: '2025-04-14', price_per_night: 158, min_nights: 2, is_active: true, created_at: '' },
  { id: '2', name: 'Hauptsaison', start_date: '2025-04-15', end_date: '2025-10-14', price_per_night: 176, min_nights: 3, is_active: true, created_at: '' }];


  return (
    <section data-ev-id="ev_616342b1f8" className="py-20 bg-muted">
      <div data-ev-id="ev_3003421b20" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-ev-id="ev_566d32082c" className="text-center mb-14">
          <div data-ev-id="ev_58208edeea" className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <CalendarDays className="w-4 h-4" />
            Transparente Preise
          </div>
          <h2 data-ev-id="ev_2e017d94c3" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Unsere Saisonpreise
          </h2>
          <p data-ev-id="ev_3db10881dd" className="text-muted-foreground max-w-2xl mx-auto">
            Faire Preise je nach Reisezeit – keine versteckten Kosten
          </p>
        </div>

        {loading ?
        <div data-ev-id="ev_efd1581b74" className="text-center py-8">
            <div data-ev-id="ev_e3c58a9032" className="animate-pulse text-muted-foreground">Preise werden geladen...</div>
          </div> :

        <>
            <div data-ev-id="ev_69460cfc93" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {displayPrices.slice(0, 3).map((season, index) =>
            <div data-ev-id="ev_0cc1af1c7f"
            key={season.id}
            className={`relative bg-card rounded-2xl overflow-hidden border-2 transition-all hover:shadow-xl ${
            index === 1 ? 'border-secondary md:scale-105 shadow-lg' : 'border-border'}`
            }>

                  {index === 1 &&
              <div data-ev-id="ev_b288dbaeb9" className="absolute top-0 left-0 right-0 bg-secondary text-white text-xs font-medium py-1.5 text-center">
                      Beliebteste Saison
                    </div>
              }
                  
                  <div data-ev-id="ev_366db8f821" className={`p-6 ${index === 1 ? 'pt-10' : ''}`}>
                    <h3 data-ev-id="ev_90ca59689a" className="font-display text-xl font-semibold mb-1">{season.name}</h3>
                    <p data-ev-id="ev_894a6ba31e" className="text-sm text-muted-foreground mb-6">
                      {formatDate(season.start_date, { day: '2-digit', month: 'short' })} – 
                      {formatDate(season.end_date, { day: '2-digit', month: 'short' })}
                    </p>
                    
                    <div data-ev-id="ev_50aa023793" className="mb-6">
                      <span data-ev-id="ev_7788eacb2e" className="text-4xl font-bold text-primary">
                        {formatCurrency(season.price_per_night)}
                      </span>
                      <span data-ev-id="ev_d7e4dbfd88" className="text-muted-foreground"> / Nacht</span>
                    </div>
                    
                    <ul data-ev-id="ev_8554ecb323" className="flex flex-col gap-2 mb-6">
                      <li data-ev-id="ev_f0c0d66ed2" className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-secondary" />
                        Mind. {season.min_nights} Nächte
                      </li>
                      <li data-ev-id="ev_b8aa320b07" className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-secondary" />
                        Bis zu 4 Gäste
                      </li>
                      <li data-ev-id="ev_d60f61c990" className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-secondary" />
                        Kostenlose Parkplätze
                      </li>
                    </ul>
                    
                    <Link to="/buchung" className="block">
                      <Button
                    className={`w-full ${
                    index === 1 ?
                    'bg-secondary hover:bg-secondary/90' :
                    'bg-primary/10 text-primary hover:bg-primary/20'}`
                    }>

                        Verfügbarkeit prüfen
                      </Button>
                    </Link>
                  </div>
                </div>
            )}
            </div>

            <div data-ev-id="ev_459b5dd638" className="bg-card rounded-2xl p-6 border border-border">
              <div data-ev-id="ev_a90f5a3478" className="flex items-start gap-4">
                <div data-ev-id="ev_0beb08b24a" className="w-10 h-10 bg-accent/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <div data-ev-id="ev_1a825e7ddb">
                  <h4 data-ev-id="ev_385bcff30c" className="font-semibold mb-2">Buchungsinformationen</h4>
                  <div data-ev-id="ev_bf34ec5fbb" className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-muted-foreground">
                    <p data-ev-id="ev_0da4049a2c"><strong data-ev-id="ev_58d2de9a33" className="text-foreground">Anzahlung:</strong> 300 € bei Buchung</p>
                    <p data-ev-id="ev_920fbfcf21"><strong data-ev-id="ev_d34d0d4068" className="text-foreground">Kaution:</strong> 200 €</p>
                    <p data-ev-id="ev_1fe19e9fde"><strong data-ev-id="ev_f81ca29b3d" className="text-foreground">Restzahlung:</strong> 4 Wochen vor Anreise</p>
                    <p data-ev-id="ev_209fb17940"><strong data-ev-id="ev_d07ce09339" className="text-foreground">Kurtaxe:</strong> 1,50 € pro Person/Tag</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </section>);

}