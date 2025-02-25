import { notFoundTextColor, notFoundSubTitle, notFoundTitle } from '../constants.ts';

const NotFound = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                textAlign: 'center',
            }}
        >
            <p
                style={{ color: notFoundTextColor, fontSize: '2rem', fontWeight: 700 }}
            >
                {notFoundTitle}
            </p>
            <p style={{ color: notFoundTextColor, fontSize: '1.5rem', fontWeight: 500 }}>
                {notFoundSubTitle}
            </p>
        </div>
    );
};

export default NotFound;