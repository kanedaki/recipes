import { match, createMenu } from "./recipes";

const template = [
  { lunch: "Pasta", dinner: "Verduras" },
  { lunch: "Pescado", dinner: "Arroz" },
  { lunch: "Verduras", dinner: "Carne" },
  { lunch: "Legumbres", dinner: "Arroz" },
];

const template2 = [{ lunch: "Fruta", dinner: "Arroz" }];

const menuAlternativo = [
  { lunch: "Lubina horno", dinner: "Paella" },
  { lunch: "Acelgas con garbanzos", dinner: "Guiso de ciervo" },
  { lunch: "Lentejas con chorizo", dinner: "Tres delicias" },
];

const menuDiferente = [
  { lunch: "Lubina horno", dinner: "Paella" },
  { lunch: "Lubina horno", dinner: "Paella" },
  { lunch: "Acelgas con garbanzos", dinner: "Guiso de ciervo" },
  { lunch: "Lentejas con chorizo", dinner: "Tres delicias" },
];

describe("test", () => {
  it("Creates a menu that matches the given template", () => {
    const menu = createMenu(template);
    expect(match(menu, template)).toBeTruthy();
  });
  it("return a proper message for every meal if the meal type in the template does not exists", () => {
    const menu = createMenu(template2);
    expect(menu[0].lunch).toBe("no recipe for Fruta");
  });
  describe("match", () => {
    describe("fails when the menu does not correspond to template because", () => {
      it("different number of days", () => {
        expect(match(menuAlternativo, template)).toBe(false);
      });
      it("different meal types", () => {
        expect(match(menuDiferente, template)).toBe(false);
      });
    });
  });
});
