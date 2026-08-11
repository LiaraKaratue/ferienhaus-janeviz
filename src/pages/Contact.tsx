import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin, Send, CheckCircle, Waves, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      {/* Hero */}
      <section data-ev-id="ev_e9e76750ae" className="relative bg-primary py-20">
        <div data-ev-id="ev_de03459511" className="absolute inset-0 opacity-10">
          <svg data-ev-id="ev_49d82d0ea1" className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 200" fill="none">
            <path data-ev-id="ev_f2ac5483a3" d="M0 100L60 108.3C120 116.7 240 133.3 360 133.3C480 133.3 600 116.7 720 108.3C840 100 960 100 1080 108.3C1200 116.7 1320 133.3 1380 141.7L1440 150V200H0V100Z" fill="white" />
          </svg>
        </div>
        <div data-ev-id="ev_f4d638eab2" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-ev-id="ev_989093a151" className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Waves className="w-4 h-4" />
            Wir freuen uns auf Sie
          </div>
          <h1 data-ev-id="ev_f6361ce4c4" className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Kontakt
          </h1>
          <p data-ev-id="ev_ef67ec1e3c" className="text-white/80 max-w-2xl mx-auto text-lg">
            Haben Sie Fragen? Wir helfen Ihnen gerne weiter.
          </p>
        </div>
      </section>

      <section data-ev-id="ev_6e242555c6" className="py-16 bg-background">
        <div data-ev-id="ev_8a773ff118" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_c2a687dc25" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div data-ev-id="ev_cde0b93851" className="flex flex-col gap-4">
              <div data-ev-id="ev_80ef0302af" className="bg-card border border-border rounded-2xl p-6 hover:border-secondary/50 transition-colors">
                <div data-ev-id="ev_f4e3497379" className="flex items-start gap-4">
                  <div data-ev-id="ev_33ffaad48f" className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div data-ev-id="ev_f7e3381628">
                    <h3 data-ev-id="ev_be0166991a" className="font-semibold text-foreground mb-1">Telefon</h3>
                    <a data-ev-id="ev_0ace639d2f" href="tel:+491234567890" className="text-muted-foreground hover:text-secondary transition-colors">
                      +49 123 456 7890
                    </a>
                    <p data-ev-id="ev_2aa9ff1407" className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Mo–Fr: 9:00 – 18:00 Uhr
                    </p>
                  </div>
                </div>
              </div>

              <div data-ev-id="ev_02295200f9" className="bg-card border border-border rounded-2xl p-6 hover:border-secondary/50 transition-colors">
                <div data-ev-id="ev_20e4a947e0" className="flex items-start gap-4">
                  <div data-ev-id="ev_88d0023b5e" className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div data-ev-id="ev_3c6c2cf9fd">
                    <h3 data-ev-id="ev_769700e6e1" className="font-semibold text-foreground mb-1">E-Mail</h3>
                    <a data-ev-id="ev_b4d639d4a8" href="mailto:info@janeviz.de" className="text-muted-foreground hover:text-secondary transition-colors">
                      info@janeviz.de
                    </a>
                    <p data-ev-id="ev_b7cfc97277" className="text-xs text-muted-foreground mt-2">
                      Antwort innerhalb von 24h
                    </p>
                  </div>
                </div>
              </div>

              <div data-ev-id="ev_3c6824bca1" className="bg-card border border-border rounded-2xl p-6 hover:border-secondary/50 transition-colors">
                <div data-ev-id="ev_83de1781d7" className="flex items-start gap-4">
                  <div data-ev-id="ev_fce468ee2c" className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div data-ev-id="ev_16787760df">
                    <h3 data-ev-id="ev_72cce761a0" className="font-semibold text-foreground mb-1">Adresse</h3>
                    <p data-ev-id="ev_602ec753fc" className="text-muted-foreground">
                      Jennewitz bei Kühlungsborn<br data-ev-id="ev_d99b3f4155" />
                      Mecklenburg-Vorpommern
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div data-ev-id="ev_e83ff40be2" className="lg:col-span-2">
              <div data-ev-id="ev_1cc7ca5a0c" className="bg-card border border-border rounded-2xl p-8">
                {submitted ?
                <div data-ev-id="ev_4a1fd627ef" className="text-center py-12">
                    <div data-ev-id="ev_ab0d15cdb8" className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 data-ev-id="ev_f963eea681" className="font-display text-2xl font-semibold mb-2">Vielen Dank!</h3>
                    <p data-ev-id="ev_f2a9c9cb8c" className="text-muted-foreground">
                      Ihre Nachricht wurde gesendet. Wir melden uns so schnell wie möglich bei Ihnen.
                    </p>
                  </div> :

                <>
                    <h2 data-ev-id="ev_3f624453f5" className="font-display text-2xl font-semibold mb-6">Nachricht senden</h2>
                    <form data-ev-id="ev_161e5ddacd" onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div data-ev-id="ev_8b488ccbd9" className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div data-ev-id="ev_4c9cc5e077">
                          <label data-ev-id="ev_f7a30cc9bb" className="block text-sm font-medium mb-2">Name</label>
                          <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ihr Name"
                          required
                          className="rounded-xl" />

                        </div>
                        <div data-ev-id="ev_0d25fa0577">
                          <label data-ev-id="ev_537da52614" className="block text-sm font-medium mb-2">E-Mail</label>
                          <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="ihre@email.de"
                          required
                          className="rounded-xl" />

                        </div>
                      </div>
                      <div data-ev-id="ev_e321be8d29">
                        <label data-ev-id="ev_e1dbed5d4c" className="block text-sm font-medium mb-2">Betreff</label>
                        <Input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Worum geht es?"
                        required
                        className="rounded-xl" />

                      </div>
                      <div data-ev-id="ev_f4eb67c268">
                        <label data-ev-id="ev_cdacc9d30a" className="block text-sm font-medium mb-2">Nachricht</label>
                        <textarea data-ev-id="ev_572398aa08"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ihre Nachricht..."
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary resize-none" />

                      </div>
                      <Button type="submit" size="lg" className="gap-2 bg-secondary hover:bg-secondary/90">
                        <Send className="w-5 h-5" />
                        Nachricht senden
                      </Button>
                    </form>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>);

}