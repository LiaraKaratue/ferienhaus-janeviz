import { Layout } from '@/components/layout/Layout';
import { Download, Instagram, Image, Palette, Type, Waves, Film, Smartphone, Tag, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';

import instagramProfile from '@/assets/generated/instagram-profile-logo.png';
import socialTemplate from '@/assets/generated/social-media-template.png';
import storyTemplate from '@/assets/generated/instagram-story-template.png';
import reelCover from '@/assets/generated/reel-cover-template.png';
import offerTemplate from '@/assets/generated/social-template-offer.png';
import greetingTemplate from '@/assets/generated/social-template-greeting.png';
import logo from '@/assets/uploads/logo-janeviz.png';

const colors = [
{ name: 'Dunkelblau', hex: '#1F3A5F', usage: 'Primary – Vertrauen & Tiefe' },
{ name: 'Meerestürkis', hex: '#2FA4A9', usage: 'Akzent – Frische & Ostsee' },
{ name: 'Sand/Beige', hex: '#D6B98C', usage: 'Warm – Gemütlichkeit' },
{ name: 'Off-White', hex: '#F5F3EF', usage: 'Background – Clean & modern' }];


const textExamples = {
  offers: [
  { title: 'Frühbucher-Rabatt', text: '10% sparen bei Buchung bis 31.03. \n\n🏡 Ferienhaus Janeviz\n📅 Gültig für Aufenthalte Apr–Jun\n💰 Ab 142€/Nacht\n\n➡️ Link in Bio' },
  { title: 'Last-Minute', text: 'Noch freie Termine!\n\n🌟 15.–22. Juni verfügbar\n🏖️ 16 Min. zum Strand\n☕ Inkl. Kaffeevollautomat\n\nJetzt schnell buchen!' },
  { title: 'Langzeit-Angebot', text: '7 Tage buchen, nur 6 zahlen!\n\n🌿 Großer Garten mit Terrasse\n🐶 Haustiere willkommen\n🎯 Perfekt für Familien' }],

  seasonal: [
  { title: 'Sommer-Highlight', text: 'Sommer an der Ostsee ☀️\n\nEndlose Strände, frische Meeresbrise und Ihr gemütliches Zuhause im Ferienhaus Janeviz.\n\n#ostseeurlaub #ferienhaus #kühlungsborn' },
  { title: 'Herbst-Gemütlichkeit', text: 'Goldener Herbst in Jennewitz 🍂\n\nLange Strandwanderungen, bunte Wälder und abends einmümmeln im warmen Ferienhaus.\n\n#herbsturlaub #ostsee' },
  { title: 'Winter-Auszeit', text: 'Winterzauber an der Ostsee ❄️\n\nStürmische See, heißer Kakao und Fußbodenheizung – perfekte Auszeit vom Alltag.' }],

  greetings: [
  { title: 'Dankeschön', text: 'Danke für Ihren Besuch! 💙\n\nWir hoffen, Sie hatten eine wunderschöne Zeit im Ferienhaus Janeviz. Bis bald an der Ostsee!\n\n#ferienhausjaneviz' },
  { title: 'Frohe Ostern', text: 'Frohe Ostern! 🐰🌷\n\nWir wünschen Ihnen entspannte Feiertage. Für kurzentschlossene: Noch wenige Termine frei!\n\n#ostern #ostsee' },
  { title: 'Frohes Neues Jahr', text: 'Frohes neues Jahr 2025! 🎉\n\nMöge es voller schöner Urlaubsmomente sein. Wir freuen uns auf Ihren Besuch!\n\n#neujahr #urlaub2025' }]

};

export default function BrandAssets() {
  const handleDownload = (imageSrc: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      {/* Hero */}
      <section data-ev-id="ev_e355aa77f9" className="relative bg-primary py-16">
        <div data-ev-id="ev_268d0c8d64" className="absolute inset-0 opacity-10">
          <svg data-ev-id="ev_cb10b2a782" className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" fill="none">
            <path data-ev-id="ev_06ead56004" d="M0 60L60 65C120 70 240 80 360 80C480 80 600 70 720 65C840 60 960 60 1080 65C1200 70 1320 80 1380 85L1440 90V120H0V60Z" fill="white" />
          </svg>
        </div>
        <div data-ev-id="ev_8a8001d538" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-ev-id="ev_d3dbf789e9" className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Palette className="w-4 h-4" />
            Janeviz Branding
          </div>
          <h1 data-ev-id="ev_d09a6f64cc" className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Brand Assets & Vorlagen
          </h1>
          <p data-ev-id="ev_2a692bf89a" className="text-white/80 max-w-2xl mx-auto text-lg">
            Alles für einheitliche Social Media Posts im Janeviz-Stil
          </p>
        </div>
      </section>

      {/* Color Palette */}
      <section data-ev-id="ev_42d0d2fb80" className="py-16 bg-background">
        <div data-ev-id="ev_9baf2d4190" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_4a8da7c762" className="text-center mb-10">
            <div data-ev-id="ev_c84f25e7b4" className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Palette className="w-4 h-4" />
              Farbpalette
            </div>
            <h2 data-ev-id="ev_c60dcdf4b4" className="font-display text-3xl font-bold text-foreground">Deine Markenfarben</h2>
          </div>
          
          <div data-ev-id="ev_65cb05d1df" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colors.map((color) =>
            <div data-ev-id="ev_012d5f877e" key={color.hex} className="bg-card border border-border rounded-2xl overflow-hidden">
                <div data-ev-id="ev_39c83429a6" className="h-20 w-full" style={{ backgroundColor: color.hex }} />
                <div data-ev-id="ev_778fb222cd" className="p-4">
                  <p data-ev-id="ev_55cbdf2719" className="font-semibold text-foreground">{color.name}</p>
                  <p data-ev-id="ev_aa173846eb" className="text-sm text-muted-foreground font-mono">{color.hex}</p>
                  <p data-ev-id="ev_b3371d5474" className="text-xs text-muted-foreground mt-1">{color.usage}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fonts */}
      <section data-ev-id="ev_789b630db4" className="py-16 bg-muted">
        <div data-ev-id="ev_ec2430c6f8" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_4e7431075f" className="text-center mb-10">
            <div data-ev-id="ev_2a7461c7ae" className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Type className="w-4 h-4" />
              Schriften
            </div>
            <h2 data-ev-id="ev_f0a0e5e278" className="font-display text-3xl font-bold text-foreground">Typografie</h2>
          </div>
          
          <div data-ev-id="ev_7d77dea2c3" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div data-ev-id="ev_806808226f" className="bg-card border border-border rounded-2xl p-8">
              <p data-ev-id="ev_2812c68e9d" className="text-sm text-secondary font-medium mb-2">Headlines & Logo</p>
              <p data-ev-id="ev_d26d5cebb5" className="font-display text-4xl text-foreground mb-4">Playfair Display</p>
              <p data-ev-id="ev_a6a47bc2ba" className="text-muted-foreground">Elegante Serif-Schrift für Überschriften und Logo.</p>
            </div>
            <div data-ev-id="ev_f756bfc0ee" className="bg-card border border-border rounded-2xl p-8">
              <p data-ev-id="ev_dd8037f03f" className="text-sm text-secondary font-medium mb-2">Text & UI</p>
              <p data-ev-id="ev_6e11a84c6a" className="text-4xl text-foreground mb-4">Poppins</p>
              <p data-ev-id="ev_3b8a3ad9f1" className="text-muted-foreground">Moderne Sans-Serif für Fließtext und Buttons.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Downloads */}
      <section data-ev-id="ev_5726391b32" className="py-16 bg-background">
        <div data-ev-id="ev_b7cb414bf6" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_e37eeefa26" className="text-center mb-10">
            <div data-ev-id="ev_243a495b5f" className="inline-flex items-center gap-2 bg-accent/30 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Image className="w-4 h-4" />
              Logos
            </div>
            <h2 data-ev-id="ev_30764d8bf7" className="font-display text-3xl font-bold text-foreground">Logo-Versionen</h2>
          </div>
          
          <div data-ev-id="ev_1afd2dc155" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Instagram Profile */}
            <div data-ev-id="ev_1e14173224" className="bg-card border border-border rounded-2xl overflow-hidden">
              <div data-ev-id="ev_e6e5ab0117" className="bg-muted p-8 flex items-center justify-center">
                <div data-ev-id="ev_89203e4448" className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img data-ev-id="ev_1ac34636bd" src={instagramProfile} alt="Instagram Profilbild" className="w-full h-full object-cover" />
                </div>
              </div>
              <div data-ev-id="ev_df6410e3d6" className="p-6">
                <div data-ev-id="ev_56934e4f77" className="flex items-center gap-2 mb-2">
                  <Instagram className="w-5 h-5 text-secondary" />
                  <h3 data-ev-id="ev_a7e18e157c" className="font-semibold text-foreground">Instagram Profilbild</h3>
                </div>
                <p data-ev-id="ev_e017041ae0" className="text-sm text-muted-foreground mb-4">
                  J + Welle + Leuchtturm für runde Darstellung.
                </p>
                <Button
                  onClick={() => handleDownload(instagramProfile, 'janeviz-instagram-profile.png')}
                  className="w-full gap-2 bg-secondary hover:bg-secondary/90">

                  <Download className="w-4 h-4" />
                  Herunterladen
                </Button>
              </div>
            </div>

            {/* Main Logo */}
            <div data-ev-id="ev_1d0353a3ac" className="bg-card border border-border rounded-2xl overflow-hidden">
              <div data-ev-id="ev_4d781c5cc0" className="bg-muted p-8 flex items-center justify-center">
                <img data-ev-id="ev_15d035968d" src={logo} alt="Janeviz Hauptlogo" className="h-28 w-auto" />
              </div>
              <div data-ev-id="ev_f0b4c50efb" className="p-6">
                <div data-ev-id="ev_6e1f7da7cb" className="flex items-center gap-2 mb-2">
                  <Waves className="w-5 h-5 text-secondary" />
                  <h3 data-ev-id="ev_52c6160067" className="font-semibold text-foreground">Hauptlogo</h3>
                </div>
                <p data-ev-id="ev_36f40a0a30" className="text-sm text-muted-foreground mb-4">
                  Für Website, Buchungsportale, Impressum.
                </p>
                <Button
                  onClick={() => handleDownload(logo, 'janeviz-logo.png')}
                  className="w-full gap-2 bg-secondary hover:bg-secondary/90">

                  <Download className="w-4 h-4" />
                  Herunterladen
                </Button>
              </div>
            </div>

            {/* Reel Cover */}
            <div data-ev-id="ev_c5987aed6d" className="bg-card border border-border rounded-2xl overflow-hidden">
              <div data-ev-id="ev_b7dc53e385" className="bg-muted p-6 flex items-center justify-center">
                <img data-ev-id="ev_e0311c156a" src={reelCover} alt="Reel Cover" className="h-28 w-auto rounded-lg shadow-md" />
              </div>
              <div data-ev-id="ev_876b1b021e" className="p-6">
                <div data-ev-id="ev_428bccaed4" className="flex items-center gap-2 mb-2">
                  <Film className="w-5 h-5 text-secondary" />
                  <h3 data-ev-id="ev_6da953d83e" className="font-semibold text-foreground">Reel Cover</h3>
                </div>
                <p data-ev-id="ev_970194bda3" className="text-sm text-muted-foreground mb-4">
                  Thumbnail für Instagram Reels.
                </p>
                <Button
                  onClick={() => handleDownload(reelCover, 'janeviz-reel-cover.png')}
                  className="w-full gap-2 bg-secondary hover:bg-secondary/90">

                  <Download className="w-4 h-4" />
                  Herunterladen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Templates */}
      <section data-ev-id="ev_7bf0e4dabd" className="py-16 bg-muted">
        <div data-ev-id="ev_b40f1eb5fb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_a566cc2513" className="text-center mb-10">
            <div data-ev-id="ev_a6cec5af85" className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Instagram className="w-4 h-4" />
              Vorlagen
            </div>
            <h2 data-ev-id="ev_9107d3bf38" className="font-display text-3xl font-bold text-foreground">Social Media Templates</h2>
            <p data-ev-id="ev_41ad98c3d7" className="text-muted-foreground mt-2">Fertige Vorlagen für verschiedene Anlässe</p>
          </div>
          
          <div data-ev-id="ev_bc0dccfae4" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Standard Post */}
            <div data-ev-id="ev_f90d86471b" className="bg-card border border-border rounded-2xl overflow-hidden">
              <div data-ev-id="ev_79e32dc066" className="bg-background p-4 flex items-center justify-center">
                <img data-ev-id="ev_24d5df0917" src={socialTemplate} alt="Standard Post" className="h-32 w-auto rounded-lg shadow-sm" />
              </div>
              <div data-ev-id="ev_b80b128ea2" className="p-4">
                <h3 data-ev-id="ev_ac78429e74" className="font-semibold text-foreground text-sm mb-2">Standard Post</h3>
                <Button
                  onClick={() => handleDownload(socialTemplate, 'janeviz-post-standard.png')}
                  size="sm"
                  className="w-full gap-1 bg-secondary hover:bg-secondary/90 text-xs">

                  <Download className="w-3 h-3" />
                  Download
                </Button>
              </div>
            </div>

            {/* Angebot */}
            <div data-ev-id="ev_f7556d78f3" className="bg-card border border-border rounded-2xl overflow-hidden">
              <div data-ev-id="ev_7d5e8feaa7" className="bg-background p-4 flex items-center justify-center">
                <img data-ev-id="ev_1b665f816c" src={offerTemplate} alt="Angebots-Vorlage" className="h-32 w-auto rounded-lg shadow-sm" />
              </div>
              <div data-ev-id="ev_81d5e4a225" className="p-4">
                <h3 data-ev-id="ev_fcda7c3fac" className="font-semibold text-foreground text-sm mb-2">Angebote</h3>
                <Button
                  onClick={() => handleDownload(offerTemplate, 'janeviz-post-angebot.png')}
                  size="sm"
                  className="w-full gap-1 bg-secondary hover:bg-secondary/90 text-xs">

                  <Download className="w-3 h-3" />
                  Download
                </Button>
              </div>
            </div>

            {/* Grüße */}
            <div data-ev-id="ev_0f608056a0" className="bg-card border border-border rounded-2xl overflow-hidden">
              <div data-ev-id="ev_3c167bcd7c" className="bg-background p-4 flex items-center justify-center">
                <img data-ev-id="ev_f50c6d356f" src={greetingTemplate} alt="Grüße-Vorlage" className="h-32 w-auto rounded-lg shadow-sm" />
              </div>
              <div data-ev-id="ev_681a3f9389" className="p-4">
                <h3 data-ev-id="ev_6b785ad333" className="font-semibold text-foreground text-sm mb-2">Saison-Grüße</h3>
                <Button
                  onClick={() => handleDownload(greetingTemplate, 'janeviz-post-gruesse.png')}
                  size="sm"
                  className="w-full gap-1 bg-secondary hover:bg-secondary/90 text-xs">

                  <Download className="w-3 h-3" />
                  Download
                </Button>
              </div>
            </div>

            {/* Story */}
            <div data-ev-id="ev_342814238a" className="bg-card border border-border rounded-2xl overflow-hidden">
              <div data-ev-id="ev_a87622182e" className="bg-background p-4 flex items-center justify-center">
                <img data-ev-id="ev_5a5b50f06b" src={storyTemplate} alt="Story-Vorlage" className="h-32 w-auto rounded-lg shadow-sm" />
              </div>
              <div data-ev-id="ev_388736147c" className="p-4">
                <h3 data-ev-id="ev_5a874d4323" className="font-semibold text-foreground text-sm mb-2">Instagram Story</h3>
                <Button
                  onClick={() => handleDownload(storyTemplate, 'janeviz-story.png')}
                  size="sm"
                  className="w-full gap-1 bg-secondary hover:bg-secondary/90 text-xs">

                  <Download className="w-3 h-3" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Text Examples */}
      <section data-ev-id="ev_b807dba14e" className="py-16 bg-background">
        <div data-ev-id="ev_f25fc0990e" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_6d208d5b94" className="text-center mb-10">
            <div data-ev-id="ev_5491cd17c7" className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Type className="w-4 h-4" />
              Texte zum Kopieren
            </div>
            <h2 data-ev-id="ev_d39d205f9d" className="font-display text-3xl font-bold text-foreground">Beispiel-Captions</h2>
            <p data-ev-id="ev_d2808876ae" className="text-muted-foreground mt-2">Fertige Texte für deine Posts – einfach kopieren & anpassen</p>
          </div>

          {/* Angebote */}
          <div data-ev-id="ev_beddabf121" className="mb-12">
            <div data-ev-id="ev_69f9f18a26" className="flex items-center gap-2 mb-6">
              <Tag className="w-5 h-5 text-secondary" />
              <h3 data-ev-id="ev_8c72e6d6a7" className="font-display text-xl font-semibold text-foreground">Angebote & Aktionen</h3>
            </div>
            <div data-ev-id="ev_1cb02afb60" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {textExamples.offers.map((example) =>
              <div data-ev-id="ev_b2e5d53c3b" key={example.title} className="bg-card border border-border rounded-2xl p-5">
                  <p data-ev-id="ev_c207212fb1" className="text-sm font-semibold text-secondary mb-2">{example.title}</p>
                  <pre data-ev-id="ev_e979bc5bf7" className="text-sm text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed bg-muted p-3 rounded-lg">
                    {example.text}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Saison */}
          <div data-ev-id="ev_164bb3be29" className="mb-12">
            <div data-ev-id="ev_d9f905e003" className="flex items-center gap-2 mb-6">
              <Waves className="w-5 h-5 text-secondary" />
              <h3 data-ev-id="ev_2e93f16cd4" className="font-display text-xl font-semibold text-foreground">Saison-Highlights</h3>
            </div>
            <div data-ev-id="ev_6c41e6530e" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {textExamples.seasonal.map((example) =>
              <div data-ev-id="ev_936088ceb9" key={example.title} className="bg-card border border-border rounded-2xl p-5">
                  <p data-ev-id="ev_a0713356d8" className="text-sm font-semibold text-secondary mb-2">{example.title}</p>
                  <pre data-ev-id="ev_6d9f083aa1" className="text-sm text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed bg-muted p-3 rounded-lg">
                    {example.text}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Grüße */}
          <div data-ev-id="ev_65f2ba807d">
            <div data-ev-id="ev_77dcc0beee" className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-secondary" />
              <h3 data-ev-id="ev_0ec2d2b643" className="font-display text-xl font-semibold text-foreground">Urlaubsgrüße & Dankeschön</h3>
            </div>
            <div data-ev-id="ev_e2909d7157" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {textExamples.greetings.map((example) =>
              <div data-ev-id="ev_0e271ff724" key={example.title} className="bg-card border border-border rounded-2xl p-5">
                  <p data-ev-id="ev_a1425e20f2" className="text-sm font-semibold text-secondary mb-2">{example.title}</p>
                  <pre data-ev-id="ev_6e6fe92a6a" className="text-sm text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed bg-muted p-3 rounded-lg">
                    {example.text}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Usage Tips */}
      <section data-ev-id="ev_3f184339f1" className="py-16 bg-muted">
        <div data-ev-id="ev_39ee1fb323" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_d64a394573" className="bg-card border border-border rounded-2xl p-8">
            <h3 data-ev-id="ev_470d5e72f0" className="font-display text-2xl font-bold text-foreground mb-6">Verwendungstipps</h3>
            <div data-ev-id="ev_7a54d6ce20" className="flex flex-col gap-4 text-muted-foreground">
              <div data-ev-id="ev_49ca73b390" className="flex items-start gap-3">
                <span data-ev-id="ev_db2191d830" className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-secondary text-sm font-bold flex-shrink-0">1</span>
                <p data-ev-id="ev_1dccf7c021"><strong data-ev-id="ev_482fc53777" className="text-foreground">Instagram Profilbild:</strong> Nur das minimale J-Logo – kein Text, da im Kreis zu klein.</p>
              </div>
              <div data-ev-id="ev_2643443bfd" className="flex items-start gap-3">
                <span data-ev-id="ev_c12ad85785" className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-secondary text-sm font-bold flex-shrink-0">2</span>
                <p data-ev-id="ev_ddbe7a67fc"><strong data-ev-id="ev_2e36989422" className="text-foreground">Posts:</strong> Vorlage in Canva/Photoshop öffnen, eigenes Foto einfügen, Text anpassen.</p>
              </div>
              <div data-ev-id="ev_5e3db1d291" className="flex items-start gap-3">
                <span data-ev-id="ev_65714e9f4c" className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-secondary text-sm font-bold flex-shrink-0">3</span>
                <p data-ev-id="ev_9b0fc3bfbe"><strong data-ev-id="ev_29e8b3ef80" className="text-foreground">Story:</strong> Hochformat-Vorlage nutzen, mit Instagram-Stickern und Text ergänzen.</p>
              </div>
              <div data-ev-id="ev_2d39eb9256" className="flex items-start gap-3">
                <span data-ev-id="ev_b0ac589fea" className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-secondary text-sm font-bold flex-shrink-0">4</span>
                <p data-ev-id="ev_b4215e062c"><strong data-ev-id="ev_32e3d3471d" className="text-foreground">Reel Cover:</strong> Als Titelbild für Reels hochladen, damit der Feed einheitlich aussieht.</p>
              </div>
              <div data-ev-id="ev_297ed60cbc" className="flex items-start gap-3">
                <span data-ev-id="ev_681e0d749f" className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-secondary text-sm font-bold flex-shrink-0">5</span>
                <p data-ev-id="ev_6a8db631fe"><strong data-ev-id="ev_f166c7af78" className="text-foreground">Wasserzeichen:</strong> Für Reels "Janeviz" + kleine Welle in Weiß oder Dunkelblau verwenden.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>);

}