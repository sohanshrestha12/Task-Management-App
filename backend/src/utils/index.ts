export function omit(
  obj: { [key: string]: unknown },
  fieldsToOmit: string[]
): object {
  // Create a shallow copy of the original object
  const newObj = { ...obj };

  // Iterate over the fields to omit and delete them from the new object
  for (const field of fieldsToOmit) {
    if (field in newObj) delete newObj[field];
  }

  return newObj;
}
