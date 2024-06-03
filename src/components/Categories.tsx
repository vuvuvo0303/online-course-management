
import { categoryFilters } from "../consts/index";

const Categories = () => {

    return (
        <div className="flexBetween w-full gap-5 flex-wrap">
            <ul className="flex gap-2 overflow-auto">
                {categoryFilters.map((filter) => (
                    <button
                        key={filter}
                        type="button"

                    >
                        {filter}
                    </button>
                ))}
            </ul>
        </div>
    );
};

export default Categories;