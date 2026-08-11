import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router';
import {
  Bed, Bath, Utensils, Tv, Car, Trees,
  Waves, Mountain, Coffee, Refrigerator,
  Flame, ShieldCheck, CalendarDays, Users, Check, Anchor } from
'lucide-react';

import wohnzimmerImage from '@/assets/uploads/wohnzimmer.jpg';
import kuecheImage from '@/assets/uploads/kueche.jpg';
import schlafzimmerImage from '@/assets/uploads/schlafzimmer.jpg';
import schlafbereichObenImage from '@/assets/uploads/schlafbereich-oben.jpg';
import terrasseImage from '@/assets/uploads/terrasse.jpg';

const rooms = [
{
  name: 'Wohnbereich',
  description: 'Gemütlicher, offener Wohn- und Essbereich mit großen Fenstern zum Garten.',
  image: wohnzimmerImage,
  features: ['Bequeme Sofaecke', 'Esstisch für 4 Personen', 'Flachbildschirm TV', 'Fußbodenheizung']
},
{
  name: 'Küche',
  description: 'Voll ausgestattete Küche mit hochwertigen Geräten.',
  image: kuecheImage,
  features: ['Herd mit Backofen', 'Geschirrspülmaschine', 'Kaffeevollautomat', 'Mikrowelle', 'Gefrier-Kühlkombi', 'Wasserkocher & Toaster']
},
{
  name: 'Schlafzimmer (EG)',
  description: 'Stilvolles Schlafzimmer mit luxuriösem Boxspringbett.',
  image: schlafzimmerImage,
  features: ['Großes Boxspringbett', 'Kleiderschrank', 'Fußbodenheizung']
},
{
  name: 'Schlafbereich (OG)',
  description: 'Großer Wohn- und Schlafbereich im Dachgeschoss.',
  image: schlafbereichObenImage,
  features: ['Zwei Einzelbetten', 'Flachbildschirm TV', 'Arbeitsplatz für Laptop', 'Separates WC']
},
{
  name: 'Terrasse & Garten',
  description: 'Großzügiger Außenbereich unter alten Birken.',
  image: terrasseImage,
  features: ['Große Terrasse', 'Sonnenschirm', 'Sonnenliegen', 'Grill']
}];


const amenities = [
{ icon: Tv, name: 'Flachbildschirm TV' },
{ icon: Car, name: '2 Parkplätze' },
{ icon: Flame, name: 'Fußbodenheizung' },
{ icon: Coffee, name: 'Kaffeevollautomat' },
{ icon: Refrigerator, name: 'Gefrier-Kühlkombi' },
{ icon: Utensils, name: 'Geschirrspüler' },
{ icon: Trees, name: 'Großer Garten' },
{ icon: Trees, name: 'Terrasse' },
{ icon: Bath, name: 'Badewanne & Dusche' },
{ icon: Bed, name: 'Boxspringbett' },
{ icon: ShieldCheck, name: 'Separate Zufahrt' },
{ icon: Anchor, name: 'Strandnah' }];


const nearbyActivities = [
{ icon: Waves, name: 'Strand Kühlungsborn', distance: '16 Min. Fahrt' },
{ icon: Waves, name: 'Yachthafen Kühlungsborn', distance: '20 Min. Fahrt' },
{ icon: Mountain, name: 'Ostsee-Grenzturm', distance: '18 Min. Fahrt' },
{ icon: Trees, name: 'Strand Rerik', distance: '14 Min. Fahrt' }];


export default function Amenities() {
  return (
    <Layout>
      {/* Hero */}
      <section data-ev-id="ev_f342262be0" className="relative bg-primary py-20">
        <div data-ev-id="ev_f341068425" className="absolute inset-0 opacity-10">
          <svg data-ev-id="ev_3f77794280" className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 200" fill="none">
            <path data-ev-id="ev_7b38aed7e9" d="M0 100L60 108.3C120 116.7 240 133.3 360 133.3C480 133.3 600 116.7 720 108.3C840 100 960 100 1080 108.3C1200 116.7 1320 133.3 1380 141.7L1440 150V200H0V100Z" fill="white" />
          </svg>
        </div>
        <div data-ev-id="ev_90e7e486a6" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-ev-id="ev_f06249a1bd" className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Anchor className="w-4 h-4" />
            Komfort & Qualität
          </div>
          <h1 data-ev-id="ev_6be58f9038" className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Ausstattung & Räume
          </h1>
          <p data-ev-id="ev_6c59a2b38e" className="text-white/80 max-w-2xl mx-auto text-lg">
            Modernes Ferienhaus mit hochwertiger Ausstattung auf zwei Ebenen
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section data-ev-id="ev_7ed75efcd1" className="py-12 bg-background border-b border-border">
        <div data-ev-id="ev_52c1892025" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_22c3ef0e71" className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div data-ev-id="ev_28ba638fb8" className="bg-card border border-border rounded-2xl p-6 text-center">
              <div data-ev-id="ev_dcda2b5cbf" className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Bed className="w-6 h-6 text-secondary" />
              </div>
              <p data-ev-id="ev_13239aa03c" className="text-3xl font-bold text-foreground">2</p>
              <p data-ev-id="ev_8bc0c29014" className="text-sm text-muted-foreground">Schlafzimmer</p>
            </div>
            <div data-ev-id="ev_5411fc209d" className="bg-card border border-border rounded-2xl p-6 text-center">
              <div data-ev-id="ev_f16bda66a3" className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Bath className="w-6 h-6 text-secondary" />
              </div>
              <p data-ev-id="ev_9bb15898d6" className="text-3xl font-bold text-foreground">1</p>
              <p data-ev-id="ev_56f5815126" className="text-sm text-muted-foreground">Badezimmer</p>
            </div>
            <div data-ev-id="ev_ebe9d867e9" className="bg-card border border-border rounded-2xl p-6 text-center">
              <div data-ev-id="ev_9726015ec1" className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <p data-ev-id="ev_8902922a75" className="text-3xl font-bold text-foreground">4</p>
              <p data-ev-id="ev_23bc051b0f" className="text-sm text-muted-foreground">Gäste max.</p>
            </div>
            <div data-ev-id="ev_efb2194708" className="bg-card border border-border rounded-2xl p-6 text-center">
              <div data-ev-id="ev_9edaae5964" className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Trees className="w-6 h-6 text-secondary" />
              </div>
              <p data-ev-id="ev_f9bef75f50" className="text-3xl font-bold text-foreground">500m²</p>
              <p data-ev-id="ev_674ce79715" className="text-sm text-muted-foreground">Garten</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section data-ev-id="ev_186b1b39b7" className="py-16 bg-background">
        <div data-ev-id="ev_19efeae569" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_303ab2ca3e" className="text-center mb-12">
            <div data-ev-id="ev_ed1ffb9131" className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Bed className="w-4 h-4" />
              Räumlichkeiten
            </div>
            <h2 data-ev-id="ev_ca44dd3318" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Unsere Räume
            </h2>
          </div>
          <div data-ev-id="ev_e27136ee74" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) =>
            <div data-ev-id="ev_8012c4df32" key={room.name} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all">
                <div data-ev-id="ev_c3955a677f" className="relative h-48 overflow-hidden">
                  <img data-ev-id="ev_053b2df231"
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                  <div data-ev-id="ev_1c99b46cd3" className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <h3 data-ev-id="ev_4ca6df71d5" className="absolute bottom-4 left-4 text-white font-display text-xl font-semibold">
                    {room.name}
                  </h3>
                </div>
                <div data-ev-id="ev_316d0a2827" className="p-6">
                  <p data-ev-id="ev_5b337ed0d9" className="text-muted-foreground text-sm mb-4">{room.description}</p>
                  <ul data-ev-id="ev_5cbb256bf8" className="flex flex-col gap-2">
                    {room.features.map((feature) =>
                  <li data-ev-id="ev_c121e0c87b" key={feature} className="text-sm flex items-center gap-2">
                        <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                        {feature}
                      </li>
                  )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section data-ev-id="ev_9edfacdab1" className="py-16 bg-muted">
        <div data-ev-id="ev_0bab7fd803" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_d6ff0c5f2a" className="text-center mb-12">
            <div data-ev-id="ev_17e6505afc" className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Check className="w-4 h-4" />
              Inklusive
            </div>
            <h2 data-ev-id="ev_65c4664f4e" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Alle Annehmlichkeiten
            </h2>
          </div>
          <div data-ev-id="ev_bf5ab26c9c" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {amenities.map((amenity) =>
            <div data-ev-id="ev_176ce79c25"
            key={amenity.name}
            className="bg-card rounded-2xl p-5 text-center border border-border hover:border-secondary/50 transition-colors">

                <div data-ev-id="ev_52eb103161" className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <amenity.icon className="w-5 h-5 text-secondary" />
                </div>
                <p data-ev-id="ev_97cf664142" className="text-sm font-medium text-foreground">{amenity.name}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Nearby */}
      <section data-ev-id="ev_f6623005b7" className="py-16 bg-background">
        <div data-ev-id="ev_b4aac203d0" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_1c98def398" className="text-center mb-12">
            <div data-ev-id="ev_40e09f2211" className="inline-flex items-center gap-2 bg-accent/30 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Waves className="w-4 h-4" />
              Ostsee-Nähe
            </div>
            <h2 data-ev-id="ev_ae3d23b6bd" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              In der Nähe
            </h2>
          </div>
          <div data-ev-id="ev_72510b7e1b" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nearbyActivities.map((activity) =>
            <div data-ev-id="ev_2c6b01bb59"
            key={activity.name}
            className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4 hover:border-secondary/50 transition-colors">

                <div data-ev-id="ev_d8665535fb" className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <activity.icon className="w-6 h-6 text-secondary" />
                </div>
                <div data-ev-id="ev_9d13d493ab">
                  <h3 data-ev-id="ev_407df31af9" className="font-semibold text-foreground">{activity.name}</h3>
                  <p data-ev-id="ev_dc4188a047" className="text-sm text-muted-foreground">{activity.distance}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-ev-id="ev_e56f8f82af" className="relative py-20 overflow-hidden">
        <div data-ev-id="ev_88d3e3aa26" className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary" />
        <div data-ev-id="ev_6f509ffdd3" className="absolute inset-0 opacity-10">
          <svg data-ev-id="ev_37c8e85bc7" className="absolute top-0 left-0 w-full" viewBox="0 0 1440 200" fill="none">
            <path data-ev-id="ev_c6ec064a17" d="M0 100L60 108.3C120 116.7 240 133.3 360 133.3C480 133.3 600 116.7 720 108.3C840 100 960 100 1080 108.3C1200 116.7 1320 133.3 1380 141.7L1440 150V0H0V100Z" fill="white" />
          </svg>
        </div>
        <div data-ev-id="ev_1592f7bcb1" className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Waves className="w-12 h-12 text-accent mx-auto mb-6" />
          <h2 data-ev-id="ev_e09c420a7d" className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Überzeugt?
          </h2>
          <p data-ev-id="ev_84682db0e4" className="text-white/80 mb-8 text-lg">
            Prüfen Sie die Verfügbarkeit und buchen Sie Ihren Traumurlaub an der Ostsee.
          </p>
          <Link to="/buchung">
            <Button size="lg" className="gap-2 bg-accent text-primary hover:bg-accent/90 font-semibold">
              <CalendarDays className="w-5 h-5" />
              Jetzt buchen
            </Button>
          </Link>
        </div>
      </section>
    </Layout>);

}