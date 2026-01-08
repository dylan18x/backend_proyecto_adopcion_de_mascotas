describe("smoke", () => {
  test("jest está configurado", () => {
    expect(true).toBe(true);
  });
  test("area del trapecio",() => { 
    const baseMayor = 5;
    const baseMenor = 3;
    const altura = 4;
    const area = ((baseMayor + baseMenor) / 2) * altura;
    expect(area).toBe(16);    
  });
});
