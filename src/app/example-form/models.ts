export type SimpleFormData = {
  firstname: string | null;
  lastname: string | null;
  gender: string | null;
  birthdate: Date | null;
};

/**
 * Paser Functions
 */
export function parseSimpleFormData(data: any): SimpleFormData {
  return {
    ...data,
    birthdate: data.birthdate ? new Date(data.birthdate) : null,
  };
}
