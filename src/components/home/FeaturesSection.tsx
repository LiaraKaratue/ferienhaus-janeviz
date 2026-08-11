import { Car, Utensils, Tv, Trees, Waves, ThermometerSun, Coffee, Bath } from 'lucide-react';

const features = [
{ icon: Waves, label: 'Strand in 16 Min.', description: 'Kühlungsborn direkt erreichbar' },
{ icon: Car, label: '2 Parkplätze', description: 'Kostenlos direkt am Haus' },
{ icon: Utensils, label: 'Vollküche', description: 'Geschirrspüler & Kaffeevollautomat' },
{ icon: Tv, label: '2× Flachbild-TV', description: 'Unten und im Dachgeschoss' },
{ icon: Trees, label: 'Großer Garten', description: 'Terrasse unter Birken' },
{ icon: ThermometerSun, label: 'Fußbodenheizung', description: 'Komplettes Erdgeschoss' },
{ icon: Coffee, label: 'Kaffeevollautomat', description: 'Für den perfekten Start' },
{ icon: Bath, label: 'Bad mit Wanne', description: 'Dusche & Badewanne' }];


export function FeaturesSection() {
  return (
    <section data-ev-id="ev_451e0b13d0" className="py-20 bg-background">
      <div data-ev-id="ev_2c2f7b8906" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-ev-id="ev_fe0b2a7162" className="text-center mb-14">
          <div data-ev-id="ev_0957242cd2" className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Waves className="w-4 h-4" />
            Komfort & Ausstattung
          </div>
          <h2 data-ev-id="ev_c427fada4a" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Alles für Ihren Traumurlaub
          </h2>
          <p data-ev-id="ev_db8229d25a" className="text-muted-foreground max-w-2xl mx-auto">
            Modernes Ferienhaus mit hochwertiger Ausstattung auf zwei Ebenen
          </p>
        </div>

        <div data-ev-id="ev_11d1a348be" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature) =>
          <div data-ev-id="ev_0ceda10c3c"
          key={feature.label}
          className="group bg-card border border-border rounded-2xl p-6 hover:border-secondary/50 hover:shadow-lg transition-all duration-300">

              <div data-ev-id="ev_035fba3e29" className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 data-ev-id="ev_28152a47eb" className="font-semibold text-foreground mb-1">{feature.label}</h3>
              <p data-ev-id="ev_5669e01cc3" className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}