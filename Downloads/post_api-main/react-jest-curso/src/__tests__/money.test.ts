import { formatMoney } from "../utils/money";

describe("formatMoney", () => {
  test("formatea positivo con USD por defecto", () => {
    // Arrange
    const amount = 10;

    // Act
    const result = formatMoney(amount);

    // Assert
    expect(result).toBe("USD 10.00");
  });

  test("formatea decimal redondeando a 2", () => {
    expect(formatMoney(10.126)).toBe("USD 10.13");
  });

  test("permite cambiar moneda", () => {
    expect(formatMoney(7, "EUR")).toBe("EUR 7.00");
  });

  test("lanza error si amount es NaN", () => {
    expect(() => formatMoney(Number.NaN)).toThrow("amount inválido");
  });

  test("lanza error si amount no es finito", () => {
    expect(() => formatMoney(Number.POSITIVE_INFINITY)).toThrow("amount inválido");
  });
});