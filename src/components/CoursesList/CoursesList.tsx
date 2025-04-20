import {FC} from "react";
import './CoursesList.css';
import {Link} from "react-router-dom";
import {ICourse} from "../../models.ts";
import { apiImageUrl } from '../../constants.ts';

interface CoursesListProps {
    courses: ICourse[]
}

const CoursesList: FC<CoursesListProps> = ({
    courses
                                           }) => {
    return (
        <div className={'cards courses-cards'}>
            {
                courses?.map(item => {
                    return (
                      <div className={'card'} key={item.id}>
                        <Link to={`/courses/${item.id}`}>
                          <img
                            className={'card-image'}
                            src={`${apiImageUrl}${item.pathToImage}`}
                            alt={item.name}
                          />
                        </Link>
                        <div className={'card-text'}>{item.name}</div>
                      </div>
                    );
                })
            }
        </div>
    );
};

export default CoursesList;