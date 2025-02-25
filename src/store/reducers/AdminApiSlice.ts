import { apiSlice } from '../api/apiSlice';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTutor: builder.mutation({
      query: (credentials) => ({
        url: '/admin/tutor',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Tutor'],
    }),
    updateTutor: builder.mutation({
      query: ({data, id}) => ({
        url: `/admin/tutor/${id}`,
        method: 'PATH',
        body: data,
      }),
      invalidatesTags: ['Tutor'],
    }),
    getAllTutors: builder.query({
      query: () => ({
        url: '/admin/tutors',
      }),
      providesTags: ['Tutor'],
    }),
    getAllEvents: builder.query({
      query: () => ({
        url: '/event/all',
      }),
      providesTags: ['Event'],
    }),
    createEvent: builder.mutation({
      query: (credentials) => ({
        url: '/event/new',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Event'],
    }),
    updateEvent: builder.mutation({
      query: ({data, id}) => ({
        url: `/event/${id}`,
        method: 'PATH',
        body: data,
      }),
      invalidatesTags: ['Event'],
    }),
    getEvent: builder.query({
      query: (id) => ({
        url: `/event/${id}`,
        method: 'GET',
      }),
      providesTags: ['Event'],
    }),
    createCourse: builder.mutation({
      query: (credentials) => ({
        url: '/course/new',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Course'],
    }),
    updateCourse: builder.mutation({
      query: ({data, id}) => ({
        url: `/course/${id}`,
        method: 'PATH',
        body: data,
      }),
      invalidatesTags: ['Course'],
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: '/course/all',
      }),
      providesTags: ['Course'],
    }),
    getCourse: builder.query({
      query: (id) => ({
        url: `/course/${id}`,
        method: 'GET',
      }),
      providesTags: ['Course'],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/event/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),
  }),
});
