import { categoryFilters, categorySubmenu } from '../../consts';
import styles from './sitemap.module.css';

const columns = 3;
const categoriesPerColumn = Math.ceil(categoryFilters.length / columns);

const renderCategories = () => {
    const columnsArray: string[][] = Array.from({ length: columns }, () => []);

    categoryFilters.forEach((category, index) => {
        const columnIndex = Math.floor(index / categoriesPerColumn);
        columnsArray[columnIndex].push(category);
    });

    return columnsArray.map((columnCategories, columnIndex) => (
        <div key={columnIndex} className={styles.sitemap_column_3}>
            {columnCategories.map((category, categoryIndex) => (
                <div className='mt-10' key={categoryIndex}>
                    <b>{category}</b>
                    <ul className='m-0 p-0'>
                        {categorySubmenu.map((subCategory, subCategoryIndex) => (
                            <li key={subCategoryIndex} className='pt-[.8rem] pl-0'>
                                <a className='text-[#5624d0]' href="">{subCategory}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    ));
};

const SiteMap: React.FC = () => {
    return (
        <div className="flex-1">
            <div className="pt-[2.4rem] md:px-[2.4rem] xs:px-6 px-4 lg:pl-28 pb-[2.4rem] w-full max-w-[134rem] mx-auto">
                <h1 className='main_h1'>Sitemap</h1>
                <h2 className='mt-[3.2rem] mb-[.8rem] main_h2'>Popular topics</h2>
                <div className={styles.sitemap}>
                    {renderCategories()}
                </div>
            </div>
        </div>
    );
}

export default SiteMap;
