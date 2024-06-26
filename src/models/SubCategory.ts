export class SubCategory {
    subCateId: string;
    cateId: string;
    createdDate: string;
    updatedDate: string;
    description: string;
    subCateName: string;
    constructor(
        subCateId: string = "",
        cateId: string = "",
        createdDate: string = "",
        updatedDate: string = "",
        description: string = "",
        subCateName: string = "",
    ) {
        this.subCateId = subCateId;
        this.cateId = cateId;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.description = description;
        this.subCateName = subCateName;
    }
}
