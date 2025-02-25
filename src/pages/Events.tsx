import { events } from '../mocks.ts';
import { Link } from 'react-router-dom';
import {adminApiSlice} from "../store/reducers/AdminApiSlice.ts";
import {useGetQueryResponse} from "../types.ts";
import {useShowErrorToast} from "../hooks.ts";
import NoData from "../components/NoData.tsx";

const Events = () => {
    const { data, error } = adminApiSlice.useGetAllEventsQuery<useGetQueryResponse<any[]>>('');

    useShowErrorToast(error);

    return (
        <div className="max-w-screen-md mx-auto p-4 space-y-4">
            {data?.map((event) => (
                <div key={event.id} className="p-4 border rounded-lg shadow-md bg-white relative flex flex-col">
                    <h3 className="text-lg font-bold mb-2">{event.name}</h3>
                    <div className="w-full overflow-hidden rounded-md flex justify-center">
                        <Link to={`/events/${event.id}`}>
                            <img
                                src={event.pathToImage.startsWith('/') ? event.pathToImage : '/placeholder.jpg'}
                                alt={event.name}
                                className="event-image"
                            />
                        </Link>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 mb-8">{event.description}</p>
                    <p className="text-gray-500 text-xs absolute bottom-4 right-4 italic">{new Date(event.dateOfEvent).toLocaleDateString()}</p>
                </div>
            ))}
            {!data?.length && <NoData />}
        </div>
    );
};

export default Events;
