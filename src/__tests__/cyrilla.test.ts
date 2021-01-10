import { cyrilla } from '../index';

describe('cyrilla()', () => {
  const text = `Społeczeństwo przyszłości to społeczeństwo dobrowolnej dezinformacji. Nikt celowo nikogo nie zwodzi. Na świecie od dawna nie było systemów ideologicznych: „komunizm”, „liberalizm”, „faszyzm”. Zamiast tego istnieje jeden przepływ informacji - każdego dnia na świecie dochodzi do tylu wydarzeń kulturalnych, politycznych, ekonomicznych, religijnych i kryminalnych, co sto lat wcześniej.`;

  it('should transliterate a Polish word', () => {
    expect(cyrilla('Społeczeństwo')).toEqual('Сполэчэньство');
  });

  it('should transliterate a first letter `e` in word to `э` using the rules from 1975', () => {
    expect(cyrilla('ekonomicznych', { language: 'POLISH_TO_CYRILLIC_1975' })).toEqual('экономичных');
  });

  it('should make сyrillization of the Polish script', () => {
    expect(cyrilla(text)).toEqual(
      `Сполэчэньство пp̌ышлошци то сполэчэньство доброволнэй дэзинформацйи. Никт цэлово никого не зводзи. На швеце од давна не было сыстэмôв идэологичных: „комунизм”, „либэрализм”, „фашызм”. Замяст тэго истнейэ йэдэн пp̌эплыв информацйи - каждэго дня на швеце доходзи до тылу выдаp̌энь културалных, политычных, экономичных, рэлигийных и крыминалных, цо сто лат вчэшней.`,
    );
  });

  it('should make сyrillization of the Polish script using the rules from 1975', () => {
    expect(
      cyrilla(text, {
        language: 'POLISH_TO_CYRILLIC_1975',
      }),
    ).toEqual(
      `Сполеченьство пржишлошци то сполеченьство добровольней дезинформацйи. Никт целёво никого не зводзи. На швеце од давна не было сыстемув идеолёгичных: „комунизм”, „либерализм”, „фашизм”. Замяст тего истнеье еден пржеплыв информацйи - каждего дня на швеце доходзи до тылю выдаржень культуральных, политычных, экономичных, религийных и крыминальных, цо сто лят вчешней.`,
    );
  });
});
