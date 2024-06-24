export class Category {
    id: string;
    cateName: string;
    createdDate: string;
    updatedDate: string;
    description: string;
    subCateId: string;

    constructor(
        id: string = "",
        cateName: string = "",
        createdDate: string = "",
        updatedDate: string = "",
        description: string = "",
        subCateId: string = ""
    ) {
        this.id = id;
        this.cateName = cateName;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.description = description;
        this.subCateId = subCateId;
    }
}
