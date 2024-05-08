// language_code

import { Fluent } from "@moebius/fluent";
import { DuckContext } from "../types/DuckContext";
import { I18n, I18nFlavor } from "@grammyjs/i18n";

// type I18n = {
//     t: (key:string)=>string;
// };

// function t(){
// }


// export async function loadLocales(){
//     const fluent = new Fluent();
//     await fluent.addTranslation({
//         // Вказуємо одну або більше локалей, які підтримуються перекладом:
//         locales: "ru",
      
//         // Також можемо вказати безпосередньо зміст перекладу:
      
//         // Або файли перекладу:
//         // filePath: [
//         //   `${__dirname}/feature-1/translation.uk.ftl`,
//         //   `${__dirname}/feature-2/translation.uk.ftl`,
//         // ],
//         filePath: [
//             `src/i18n/locales/ru.ftl`,
//         ],
//         // Усі аспекти Fluent легко налаштовуються:
//         bundleOptions: {
//             // Використовуємо цю опцію, щоб уникнути невидимих символів навколо підставлених змінних.
//             useIsolating: false,
//         },
//     });

//     const res = fluent.translate("ru","welcome",{});
//     console.log("res:",res);
    
// }












// type MyContext = DuckContext & I18nFlavor;



// розширимо контекст за допомогою розширювача для контексту з плагіну i18n:
type MyContext = DuckContext & I18nFlavor;

// Створюємо екземпляр`I18n`.
// Продовжуйте читати, щоб дізнатися, як налаштувати екземпляр.
const i18n = new I18n<MyContext>({
    defaultLocale: "ru", // дивіться нижче для отримання додаткової інформації
    //directory: "src/i18n/locales/ru.ftl", // завантажуємо всі файли перекладу з каталогу locales/
    directory:"src/i18n/locales/"

});
// i18n.loadLocaleSync("ru", { filePath: "src/i18n/locales/ru.ftl" });
i18n.loadLocaleSync("en", {
    source: `greeting = Hello { $name }! language-set = Language has been set to English!`,
});
console.log("i18n.locales:",i18n.locales);

// console.log("res:",i18n.t("ru","welcome",{
//     name: 'dimaso'
// }));

console.log("_res1:",i18n.t("ru","welcome",{ name: 'dimaso', applesCount:"1" }));
console.log("_res12:",i18n.t("ru","welcome2",{ name: 'dimaso', applesCount:2 }));
console.log("_res2:",i18n.t("en","greeting",{ name: 'dimaso' }));
console.log("_res3:",i18n.t("kk","greeting",{ name: 'dimaso' }));

// let str1  = `greeting = Hello { $name }!
//     language-set = Language has been set to English!`;
// let str2 = `greeting = Hello { $name }!
// language-set = Language has been set to English!`;
// console.log("kek" === "kek");
// console.log(str1.length);
// console.log(str2.length);
// console.log(str1 === str2);
// console.log(typeof str1);




















console.log("end.");


// loadLocales();

// const tt = createTranslator();
// console.log("TT:",tt.t("ry","help-menu-save",{kek:10}));
