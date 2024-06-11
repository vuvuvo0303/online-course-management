export class Blog {
    id: string = "";
    category: string = "";
    time: string = "";
    title: string = "";
    introduce: string = "";
    description: {
        title: string,
        content: { text: string, images?: string[] }[]
    }[] = [];
    avatar_user: string = "";
    name_user: string = "";
    blog_image: string = "";
    view = 0;

    constructor(
        id: string = "",
        category: string = "",
        time: string = "",
        title: string = "",
        introduce: string = "",
        description: {
            title: string,
            content: { text: string, images?: string[] }[]
        }[] = [],
        avatar_user: string = "",
        name_user: string = "",
        blog_image: string = "",
        view: number = 0
    ) {
        this.id = id;
        this.category = category;
        this.time = time;
        this.title = title;
        this.introduce = introduce;
        this.description = description;
        this.avatar_user = avatar_user;
        this.name_user = name_user;
        this.blog_image = blog_image;
        this.view = view;
    }
}
