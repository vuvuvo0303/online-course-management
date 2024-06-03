
import { categoryFilters } from "../consts/index";

const Categories = () => {

    return (
        <div className="flexBetween w-full gap-5 flex-wrap">
            <ul className="flex gap-2 overflow-auto">
                {categoryFilters.map((filter) => (
                    <button
                        key={filter}
                        type="button"
                        className="px-4 py-3 rounded-lg capitalize whitespace-nowrap"
                    >
                        {filter}
                    </button>
                ))}
            </ul>
        </div>
    );
};

export default Categories;