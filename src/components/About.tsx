import { useEffect } from 'react';
import useAxios from '../hook/useAxios';
import { useState } from 'react';

function About() {
    const [myData, setMyData] = useState<any>(null);
    const { data, loading, error, refetch } = useAxios({
        url: 'https://yts.mx/api/v2/list_movies.json'
    });

    useEffect(() => {
        if (data) {
            console.log('data : ', data?.data.data.movies);
            setMyData(data?.data.data.movies);
        }
    }, [data]);

    return (
        <div>
            <h1>About 페이지입니다.</h1>
            <button onClick={refetch}>Refetch</button>
            {loading && <div>로딩중...</div>}
            {error && <div>에러가 발생했습니다</div>}
            {myData && myData.map((item: any) => {
                return (
                    <div key={item.id}>
                        <h2>{item.id} {item.title}</h2>
                        
                    </div>
                );
            })}
        </div>
    );
}

export default About;
