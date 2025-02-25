import { useParams } from 'react-router-dom';
import { events } from "../mocks.ts";
import {adminApiSlice} from "../store/reducers/AdminApiSlice.ts";
import {useGetQueryResponse} from "../types.ts";
import {useShowErrorToast} from "../hooks.ts";
import NoData from "../components/NoData.tsx";

const Event = () => {
    const { id } = useParams();
    const { data, error } = adminApiSlice.useGetEventQuery<useGetQueryResponse<any>>(id);

    useShowErrorToast(error);

    // const event = events.find((e) => e.id.toString() === id);

    return (
        <div className="max-w-screen-xl mx-auto p-6  min-h-screen flex flex-col items-center">
            {!!data && <div className="w-full p-6 border rounded-lg shadow-lg bg-white flex flex-col">
                <img
                    src={data.pathToImage.startsWith('/') ? data.pathToImage : '/placeholder.jpg'}
                    alt={data.name}
                    className="event-image self-center"
                />
                <h1 className="text-3xl font-extrabold mt-6 text-gray-900">{data.name}</h1>
                <p className="text-gray-700 text-base mt-4 leading-relaxed">{data.description}</p>
                <p className="text-gray-500 text-sm mt-3 italic">Дата
                    события: {new Date(data.dateOfEvent).toLocaleDateString()}</p>
            </div>}
            {!data?.length && <NoData />}
        </div>
    );
};

export default Event;
