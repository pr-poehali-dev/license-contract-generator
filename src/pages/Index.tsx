import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  contractNumber: string;
  contractDate: string;
  citizenship: string;
  fullName: string;
  shortName: string;
  nickname: string;
  passport: string;
  email: string;
}

export default function Index() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    contractNumber: '',
    contractDate: '',
    citizenship: '',
    fullName: '',
    shortName: '',
    nickname: '',
    passport: '',
    email: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emptyFields = Object.entries(formData).filter(([_, value]) => !value.trim());
    if (emptyFields.length > 0) {
      toast({
        title: "Заполните все поля",
        description: "Для генерации договора необходимо заполнить все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Договор сгенерирован!",
        description: "Архив с документами готов к скачиванию"
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="FileText" className="text-primary-foreground" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight">Генератор договоров</h1>
                <p className="text-sm text-muted-foreground">Автоматическое создание документов</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#form" className="text-sm font-medium hover:text-primary transition-colors">
                Форма
              </a>
              <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
                FAQ
              </a>
              <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">
                Контакты
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section id="form" className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
              Создайте лицензионный договор
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Заполните форму ниже, и мы автоматически сгенерируем полный пакет документов: договор, приложения и акт приема-передачи
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="User" size={20} />
                Данные лицензиара
              </CardTitle>
              <CardDescription>
                Все поля обязательны для заполнения
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contractNumber">Номер договора</Label>
                    <Input
                      id="contractNumber"
                      placeholder="25/10/2025"
                      value={formData.contractNumber}
                      onChange={(e) => handleInputChange('contractNumber', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contractDate">Дата заключения</Label>
                    <Input
                      id="contractDate"
                      type="date"
                      value={formData.contractDate}
                      onChange={(e) => handleInputChange('contractDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="citizenship">Гражданство</Label>
                    <Input
                      id="citizenship"
                      placeholder="Германии"
                      value={formData.citizenship}
                      onChange={(e) => handleInputChange('citizenship', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nickname">Творческий псевдоним</Label>
                    <Input
                      id="nickname"
                      placeholder="EDDI$"
                      value={formData.nickname}
                      onChange={(e) => handleInputChange('nickname', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">ФИО полностью (в родительном падеже)</Label>
                  <Input
                    id="fullName"
                    placeholder="EDUARD FRANK IOSIFOVIC"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortName">ФИО кратко (для подписи)</Label>
                  <Input
                    id="shortName"
                    placeholder="EDUARD F.I."
                    value={formData.shortName}
                    onChange={(e) => handleInputChange('shortName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passport">Паспортные данные</Label>
                  <Input
                    id="passport"
                    placeholder="GER: L8V2RCZ80"
                    value={formData.passport}
                    onChange={(e) => handleInputChange('passport', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Адрес электронной почты</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                      Генерация документов...
                    </>
                  ) : (
                    <>
                      <Icon name="Download" className="mr-2" size={20} />
                      Сгенерировать договор
                    </>
                  )}
                </Button>

                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Icon name="Shield" className="text-primary mt-0.5" size={20} />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Конфиденциальность гарантирована.</span> Ваши данные не сохраняются на сервере и используются только для генерации документов.
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        <section id="faq" className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">
              Часто задаваемые вопросы
            </h2>
            <p className="text-muted-foreground">
              Ответы на популярные вопросы о генераторе договоров
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-medium text-left">Какие документы входят в пакет?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Вы получите ZIP-архив с 5 документами: основной лицензионный договор, 
                Приложение №1 (Перечень Произведений), Приложение №2 (Дизайн-макеты), 
                Приложение №3 (Финансовые условия) и Акт приема-передачи.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-medium text-left">Сохраняются ли мои данные на сервере?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Нет, абсолютно все данные обрабатываются в оперативной памяти сервера и 
                удаляются сразу после генерации документов. Мы не сохраняем вашу персональную 
                информацию.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-medium text-left">В каком формате генерируются документы?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Все документы создаются в формате DOCX и полностью совместимы с Microsoft Word, 
                LibreOffice Writer и другими текстовыми редакторами. Форматирование полностью 
                сохраняется.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-medium text-left">Как заполнять дату договора?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Выберите дату в календаре, и система автоматически преобразует её в текстовый 
                формат (например, "25 октября 2025 г.") для подстановки в документы.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-medium text-left">Можно ли редактировать документы после генерации?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, после скачивания вы можете открыть любой документ в текстовом редакторе 
                и внести необходимые изменения. Все документы полностью редактируемые.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section id="contacts" className="max-w-3xl mx-auto mb-20">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Свяжитесь с нами</CardTitle>
              <CardDescription>
                Есть вопросы или предложения? Мы всегда на связи
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a href="mailto:support@docgen.com" className="text-sm text-primary hover:underline">
                      support@docgen.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Телефон</h3>
                    <a href="tel:+74951234567" className="text-sm text-primary hover:underline">
                      +7 (495) 123-45-67
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="MessageCircle" className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Telegram</h3>
                    <a href="https://t.me/docgen_support" className="text-sm text-primary hover:underline">
                      @docgen_support
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Время работы</h3>
                    <p className="text-sm text-muted-foreground">
                      Пн-Пт: 9:00 - 18:00 (МСК)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Генератор лицензионных договоров. Все права защищены.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
