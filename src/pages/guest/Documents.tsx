import { Link } from 'react-router';
import { GuestLayout } from '@/components/layout/GuestLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  ArrowLeft, FileText, Home, Wifi, Car, Trash2, AlertTriangle,
  Phone, MapPin, Calendar } from
'lucide-react';

const documents = [
{
  title: 'Hausordnung',
  icon: Home,
  content: [
  'Nachtruhe von 22:00 bis 07:00 Uhr',
  'Rauchen nur im Außenbereich gestattet',
  'Haustiere nur nach vorheriger Absprache',
  'Musik in Zimmerlautstärke',
  'Parken nur auf dem zugewiesenen Stellplatz',
  'Grillplatz nach Benutzung reinigen']

},
{
  title: 'WLAN-Zugang',
  icon: Wifi,
  content: [
  'Netzwerkname: Ferienhaus-Guest',
  'Passwort: Willkommen2024!',
  'Bei Problemen: Router neu starten (Keller)']

},
{
  title: 'Mülltrennung',
  icon: Trash2,
  content: [
  'Restmüll: Graue Tonne',
  'Papier: Blaue Tonne',
  'Verpackungen: Gelber Sack',
  'Bioabfall: Grüne Tonne',
  'Glas: Container am Ortseingang',
  'Abholung: Montags (Restmüll), Mittwochs (Papier/Gelber Sack)']

},
{
  title: 'Parkplatz',
  icon: Car,
  content: [
  'Stellplatz direkt am Haus',
  'Platz für 2 PKW',
  'Bitte Einfahrt freihalten']

}];


const emergencyContacts = [
{ name: 'Notfall / Polizei', number: '110' },
{ name: 'Feuerwehr / Rettung', number: '112' },
{ name: 'Vermieter (Notfall)', number: '+49 123 456 7890' },
{ name: 'Ärztlicher Bereitschaftsdienst', number: '116 117' }];


const localAttractions = [
{ name: 'Strand Nordstrand', distance: '10 Min', type: 'Natur' },
{ name: 'Wanderweg "Waldpfad"', distance: 'Direkt am Haus', type: 'Aktivität' },
{ name: 'Restaurant "Zum Anker"', distance: '5 Min', type: 'Gastronomie' },
{ name: 'Supermarkt EDEKA', distance: '3 Min', type: 'Einkaufen' },
{ name: 'Wochenmarkt', distance: '15 Min', type: 'Samstags 8-13 Uhr' }];


export default function Documents() {
  return (
    <GuestLayout title="Hausinfos" subtitle="Alles Wichtige für Ihren Aufenthalt">
      <div data-ev-id="ev_1c9bca0f51" className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/portal" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Portal
        </Link>

        <h1 data-ev-id="ev_77ac2cdd9e" className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-8">
          Informationen zu Ihrem Aufenthalt
        </h1>

        {/* Documents Grid */}
        <div data-ev-id="ev_d1e971836c" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {documents.map((doc) =>
          <Card key={doc.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <doc.icon className="w-5 h-5 text-primary" />
                  {doc.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul data-ev-id="ev_c37d75f510" className="flex flex-col gap-2">
                  {doc.content.map((item, idx) =>
                <li data-ev-id="ev_2ca856d537" key={idx} className="text-sm flex items-start gap-2">
                      <span data-ev-id="ev_a121edf117" className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                )}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Emergency Contacts */}
        <Card className="mb-8 border-warning bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Notfallkontakte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div data-ev-id="ev_e52c11090a" className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {emergencyContacts.map((contact) =>
              <div data-ev-id="ev_8749f43932" key={contact.name} className="text-center">
                  <a data-ev-id="ev_94606a0eb4"
                href={`tel:${contact.number}`}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors">

                    <Phone className="w-6 h-6 text-warning" />
                    <span data-ev-id="ev_6ae2b50548" className="text-lg font-bold">{contact.number}</span>
                    <span data-ev-id="ev_1d9859a256" className="text-xs text-muted-foreground">{contact.name}</span>
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Local Attractions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5 text-primary" />
              In der Nähe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div data-ev-id="ev_de18d905b1" className="flex flex-col gap-3">
              {localAttractions.map((place) =>
              <div data-ev-id="ev_da9b49755d" key={place.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div data-ev-id="ev_54d159d029">
                    <p data-ev-id="ev_eaf96305ce" className="font-medium">{place.name}</p>
                    <p data-ev-id="ev_a9339c89eb" className="text-sm text-muted-foreground">{place.type}</p>
                  </div>
                  <span data-ev-id="ev_a847b49e82" className="text-sm font-medium text-primary">{place.distance}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Kurtaxe Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-primary" />
              Kurtaxe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p data-ev-id="ev_cf62a07178" className="text-muted-foreground mb-4">
              Die Kurtaxe ist vor Ort zu entrichten. Mit der Gästekarte erhalten Sie 
              vergünstigten Eintritt zu vielen Attraktionen in der Region.
            </p>
            <div data-ev-id="ev_2f7beed537" className="bg-muted p-4 rounded-lg">
              <p data-ev-id="ev_503e84ee65" className="font-medium">Kosten pro Person/Nacht:</p>
              <ul data-ev-id="ev_889486c055" className="mt-2 flex flex-col gap-1 text-sm">
                <li data-ev-id="ev_001a7b942a">Erwachsene: 2,50 EUR</li>
                <li data-ev-id="ev_85f2e0517e">Kinder (6-16 Jahre): 1,00 EUR</li>
                <li data-ev-id="ev_2ee6d0178a">Kinder unter 6 Jahren: frei</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </GuestLayout>);

}