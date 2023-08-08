export class MediaFile {
    public name: string;
    private readonly _type: string;
    private readonly _base64: string;

    constructor(name:string, type:string, base64:string) {
        this.name = name;
        this._type = type;
        this._base64 = base64;

    }

    public get type():string {
        return this._type;
    }
}