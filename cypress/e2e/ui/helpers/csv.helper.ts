
/**
 * @description Parsea contenido CSV a un array de objetos
 * @param csvContent Contenido del archivo CSV como string
 * @author Camilo
 * @returns Array de objetos con las coulmnas
 */
export const parseCSV = <T>(csvContent: string): T[] => {
    const normalizedContent = csvContent?.trim();
    if (!normalizedContent) {
        throw new Error('CSV vacio o sin formato valido');
    }

    const lines = normalizedContent
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    if (lines.length < 2) {
        throw new Error('CSV sin registros');
    }

    const headers = lines[0].split(',').map((h) => h.trim());
    if (headers.some((header) => !header)) {
        throw new Error('CSV con encabezados invalidos');
    }

    return lines.slice(1).map((line, rowIndex) => {
        const values = line.split(',').map((v) => v.trim());
        if (values.length !== headers.length) {
            throw new Error(
                `CSV con columnas inconsistentes en la fila ${rowIndex + 2}`
            );
        }

        const obj: Record<string, string> = {};
        headers.forEach((header, index) => {
            obj[header] = values[index];
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
    if (!filePath?.trim()) {
        throw new Error('Ruta de CSV no configurada');
    }

    return cy.readFile(filePath).then((content: string) => {
        return parseCSV<T>(content);
    });
}
