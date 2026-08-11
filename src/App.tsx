/**
 * ⚠️ ROUTING RULES:
 * - Router is in main.tsx. Do NOT add another <BrowserRouter> here or anywhere.
 * - Use <Routes> + <Route> components ONLY. Do NOT use useRoutes().
 * - STATIC IMPORTS ONLY — no React.lazy() or dynamic import().
 * - Import from 'react-router' — NOT 'react-router-dom' (does not exist).
 */
import { Routes, Route } from 'react-router';
import Index from '@/pages/Index';
import Booking from '@/pages/Booking';
import Login from '@/pages/Login';
import Contact from '@/pages/Contact';
import Amenities from '@/pages/Amenities';
import BrandAssets from '@/pages/BrandAssets';
import GuestPortal from '@/pages/guest/Portal';
import GuestContract from '@/pages/guest/Contract';
import GuestMessages from '@/pages/guest/Messages';
import GuestDocuments from '@/pages/guest/Documents';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminBookings from '@/pages/admin/Bookings';
import AdminBookingDetail from '@/pages/admin/BookingDetail';
import AdminMessages from '@/pages/admin/Messages';
import AdminCustomers from '@/pages/admin/Customers';
import AdminOffers from '@/pages/admin/Offers';
import AdminSetup from '@/pages/admin/Setup';
import GuestOffers from '@/pages/guest/Offers';
import Events from '@/pages/Events';

export default function App() {
	return (
		<Routes>
			{/* Public Routes */}
			<Route path="/" element={<Index />} />
			<Route path="/buchung" element={<Booking />} />
			<Route path="/ausstattung" element={<Amenities />} />
			<Route path="/login" element={<Login />} />
			<Route path="/kontakt" element={<Contact />} />
			<Route path="/events" element={<Events />} />
			<Route path="/brand" element={<BrandAssets />} />
			
			{/* Guest Portal Routes */}
			<Route path="/portal" element={<GuestPortal />} />
			<Route path="/portal/vertrag" element={<GuestContract />} />
			<Route path="/portal/nachrichten" element={<GuestMessages />} />
			<Route path="/portal/dokumente" element={<GuestDocuments />} />
			<Route path="/portal/angebote" element={<GuestOffers />} />
			
			{/* Admin Routes - Zugang über /verwaltung */}
			<Route path="/verwaltung" element={<Login />} />
			<Route path="/verwaltung/setup" element={<AdminSetup />} />
			<Route path="/admin" element={<AdminDashboard />} />
			<Route path="/admin/buchungen" element={<AdminBookings />} />
			<Route path="/admin/buchungen/:id" element={<AdminBookingDetail />} />
			<Route path="/admin/nachrichten" element={<AdminMessages />} />
			<Route path="/admin/kunden" element={<AdminCustomers />} />
			<Route path="/admin/angebote" element={<AdminOffers />} />
		</Routes>
	);
}
