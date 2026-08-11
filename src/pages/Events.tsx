import { Layout } from '@/components/layout/Layout';
import { Calendar, MapPin, ArrowRight, Waves } from 'lucide-react';
import { useState, useEffect } from 'react';
import { wpRequest, WPPost } from '@/integrations/wordpress/client';
import { formatDate } from '@/lib/utils';
import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';

// Placeholder image for events without featured image
const placeholderImage = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop';

export default function Events() {
  const [events, setEvents] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const posts = await wpRequest<WPPost[]>('/wp-json/wp/v2/posts?categories=3&per_page=12&_embed');
        setEvents(posts);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <Layout>
      {/* Hero Section with Wave Pattern */}
      <section data-ev-id="ev_e38b3930f0" className="relative bg-primary py-20 overflow-hidden">
        {/* Decorative Wave */}
        <div data-ev-id="ev_1fcc5b2972" className="absolute bottom-0 left-0 right-0">
          <svg data-ev-id="ev_d46f88f5ba" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path data-ev-id="ev_f1021175f5" d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FAFBFC" />
          </svg>
        </div>
        
        <div data-ev-id="ev_5b082d6095" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-ev-id="ev_f4c05c3cc0" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-6">
            <Waves className="w-4 h-4 text-accent" />
            <span data-ev-id="ev_d5e13ed2c0" className="text-sm text-white/90">Ostsee-Erlebnisse</span>
          </div>
          
          <h1 data-ev-id="ev_7806b78dda" className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Events & Ausflugstipps
          </h1>
          <p data-ev-id="ev_e771057404" className="text-white/80 max-w-2xl mx-auto text-lg">
            Entdecken Sie die schönsten Veranstaltungen und Sehenswürdigkeiten 
            rund um Kühlungsborn und die mecklenburgische Ostseeküste.
          </p>
        </div>
      </section>

      {/* Events Masonry Grid */}
      <section data-ev-id="ev_668d189d27" className="py-16">
        <div data-ev-id="ev_da6eea66b8" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ?
          <div data-ev-id="ev_6810e8604d" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) =>
            <div data-ev-id="ev_215e55ba11" key={i} className="animate-pulse">
                  <div data-ev-id="ev_e857002051" className="bg-muted rounded-xl h-64 mb-4" />
                  <div data-ev-id="ev_ca08545e3c" className="h-4 bg-muted rounded w-1/4 mb-2" />
                  <div data-ev-id="ev_3140555b22" className="h-6 bg-muted rounded w-3/4" />
                </div>
            )}
            </div> :
          events.length === 0 ?
          <div data-ev-id="ev_f186cdbf8f" className="text-center py-20">
              <div data-ev-id="ev_7edd248a66" className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 data-ev-id="ev_a3da6ea54f" className="font-display text-2xl font-semibold mb-2">Bald mehr Events</h3>
              <p data-ev-id="ev_547798bdb0" className="text-muted-foreground max-w-md mx-auto">
                Wir arbeiten an spannenden Veranstaltungstipps für Ihren Urlaub. 
                Schauen Sie bald wieder vorbei!
              </p>
            </div> :

          <div data-ev-id="ev_92387615c1" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => {
              const imageUrl = event._embedded?.['wp:featuredmedia']?.[0]?.source_url || placeholderImage;
              const isLarge = index === 0 || index === 3;

              return (
                <article data-ev-id="ev_d6355c58cc"
                key={event.id}
                className={`group cursor-pointer ${
                isLarge ? 'md:col-span-2 lg:col-span-1' : ''}`
                }>

                    {/* Image Container */}
                    <div data-ev-id="ev_92ddafe3bc" className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
                      <img data-ev-id="ev_fb19020f7d"
                    src={imageUrl}
                    alt={event.title.rendered.replace(/<[^>]*>/g, '')}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                      
                      {/* Gradient Overlay */}
                      <div data-ev-id="ev_487f76d6d8" className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      
                      {/* Date Badge */}
                      <div data-ev-id="ev_11d949b7e8" className="absolute top-4 left-4">
                        <div data-ev-id="ev_087a988268" className="bg-white rounded-lg px-3 py-2 shadow-lg">
                          <div data-ev-id="ev_63e4b92a0a" className="text-xs text-muted-foreground uppercase tracking-wide">
                            {new Date(event.date).toLocaleDateString('de-DE', { month: 'short' })}
                          </div>
                          <div data-ev-id="ev_1aa91f32da" className="text-xl font-bold text-primary leading-none">
                            {new Date(event.date).getDate()}
                          </div>
                        </div>
                      </div>
                      
                      {/* Content Overlay */}
                      <div data-ev-id="ev_591c6012bf" className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 data-ev-id="ev_ca24b93c08"
                      className="font-display text-xl font-semibold text-white mb-2 line-clamp-2 group-hover:text-accent transition-colors"
                      dangerouslySetInnerHTML={{ __html: event.title.rendered }} />

                        <div data-ev-id="ev_15845b0fc6" className="flex items-center gap-2 text-white/80 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span data-ev-id="ev_54b155bcaa">Kühlungsborn & Umgebung</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Excerpt */}
                    <div data-ev-id="ev_0b8ac05fe0"
                  className="text-muted-foreground text-sm line-clamp-2 mb-3"
                  dangerouslySetInnerHTML={{ __html: event.excerpt?.rendered || '' }} />

                    
                    {/* Read More Link */}
                    <div data-ev-id="ev_20dcb66053" className="flex items-center gap-2 text-secondary font-medium text-sm group-hover:text-primary transition-colors">
                      <span data-ev-id="ev_d1165d3c50">Mehr erfahren</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </article>);

            })}
            </div>
          }
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section data-ev-id="ev_8898b05e76" className="py-20 bg-gradient-to-br from-primary via-primary to-secondary">
        <div data-ev-id="ev_0f3a273268" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-ev-id="ev_5f53464bb4" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-6">
            <Calendar className="w-4 h-4 text-accent" />
            <span data-ev-id="ev_ca7e712ec4" className="text-sm text-white/90">Immer aktuell</span>
          </div>
          
          <h2 data-ev-id="ev_3e10431ed3" className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Ihr Urlaub, Ihre Erlebnisse
          </h2>
          <p data-ev-id="ev_81db7d3678" className="text-white/80 mb-8 max-w-2xl mx-auto">
            Wir aktualisieren diese Seite regelmäßig mit neuen Veranstaltungen, 
            saisonalen Highlights und Geheimtipps für Ihren Ostseeurlaub.
          </p>
          
          <div data-ev-id="ev_d59da54556" className="flex flex-wrap justify-center gap-4">
            <Link to="/buchung">
              <Button size="lg" className="bg-white text-primary hover:bg-accent hover:text-primary gap-2">
                Jetzt buchen
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/kontakt">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Fragen? Kontakt
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section data-ev-id="ev_64b7e8f417" className="py-16">
        <div data-ev-id="ev_1e5e1f7a3a" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_33420a9615" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div data-ev-id="ev_e71e5fdb7b" className="bg-card rounded-2xl p-6 border border-border text-center">
              <div data-ev-id="ev_5a45edfad2" className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Waves className="w-7 h-7 text-secondary" />
              </div>
              <h3 data-ev-id="ev_d5d1a60108" className="font-display text-lg font-semibold mb-2">Strand & Meer</h3>
              <p data-ev-id="ev_147b021d34" className="text-muted-foreground text-sm">
                Nur 16 Minuten zum Strand von Kühlungsborn
              </p>
            </div>
            
            <div data-ev-id="ev_479250beea" className="bg-card rounded-2xl p-6 border border-border text-center">
              <div data-ev-id="ev_4360fff572" className="w-14 h-14 bg-accent/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <h3 data-ev-id="ev_2193dda368" className="font-display text-lg font-semibold mb-2">Ganzjährig Erlebnisse</h3>
              <p data-ev-id="ev_ad8c095616" className="text-muted-foreground text-sm">
                Sommer am Strand, Winter gemütlich
              </p>
            </div>
            
            <div data-ev-id="ev_e5460e1d87" className="bg-card rounded-2xl p-6 border border-border text-center">
              <div data-ev-id="ev_7c5daa9111" className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <h3 data-ev-id="ev_768e6854ea" className="font-display text-lg font-semibold mb-2">Zentrale Lage</h3>
              <p data-ev-id="ev_7e48e0ed2a" className="text-muted-foreground text-sm">
                Rostock & Wismar in 30 km Reichweite
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>);

}