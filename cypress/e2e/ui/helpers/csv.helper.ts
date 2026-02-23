
/**
 * @description Parsea contenido CSV a un array de objetos
 * @param csvContent Contenido del archivo CSV como string
 * @author Camilo
 * @returns Array de objetos con las coulmnas
 */
export const parseCSV = <T>(csvContent: string): T[] => {
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',').map((h) => h.trim());

    return lines.slice(1).map((line) => {
        const values = line.split(',').map((v) => v.trim());
        const obj: Record<string, string> = {};
        headers.forEach((header, index) => {
            obj[header] = values[index] || '';
        });
        return obj as T;
    });
}

/**
 * @description Carga y parsea un archivo CSV desde la carpeta data
 * @param filePath Ruta al archivo CSV
 * @author Camilo
 */
export const loadCSV = <T>(filePath: string): Cypress.Chainable<T[]> => {
    return cy.readFile(filePath).then((content: string) => {
        return parseCSV<T>(content);
    });
}
