import { apiSlice } from '../api/apiSlice';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    importCourses: builder.mutation({
      query: (credentials) => ({
        url: '/course/import',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Course'],
    }),
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
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Tutor'],
    }),
    getProfile: builder.query({
      query: () => ({
        url: '/profile',
      }),
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Event'],
    }),
    getAllTutors: builder.query({
      query: () => ({
        url: '/admin/tutors',
      }),
      providesTags: ['Tutor'],
    }),
    getAllTutorsShort: builder.query({
      query: () => ({
        url: '/admin/tutors/short',
      }),
      providesTags: ['Tutor'],
    }),
    getTutorsInfo: builder.query({
      query: () => ({
        url: '/admin/tutors/info',
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
        method: 'POST',
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
    courseRecord: builder.mutation({
      query: (id) => ({
        url: `/participation/${id}`,
        method: 'Post',
        body: {},
      }),
      invalidatesTags: ['Course'],
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
        method: 'POST',
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
    deleteTutor: builder.mutation({
      query: (id) => ({
        url: `/tutors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tutor'],
    }),
    changePersonStatus: builder.mutation({
      query: (username) => ({
        url: '/admin/person-status',
        method: 'POST',
        body: {username}
      }),
      invalidatesTags: ['Tutor'],
    }),
  }),
});
