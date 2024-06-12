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
}
