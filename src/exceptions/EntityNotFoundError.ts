export class EntityNotFoundError extends Error
{
    constructor(entityName, paramValue, paramName = "ID") {
        super(`${entityName} whit ${paramName} '${paramValue}' does not exist.`);
        this.name = "EntityNotFoundError";
    }
}