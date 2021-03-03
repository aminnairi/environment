declare const Environment = {
    from(path: string): Promise<Record<string, string>>;
};
export = {Environment};