// Control decorator is defined here

export function Controller(baseRoute: string = '') {
    return (target: any) => {
        Reflect.defineMetadata('baseRoute', baseRoute, target);
    };
}
