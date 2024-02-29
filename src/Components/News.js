import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        try {
            setLoading(true);
            props.setProgress(10);

            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=2e34115d9f71463fa582cde7bad0a547&page=${page}&pageSize=${props.pageSize}`;

            let data = await fetch(url);
            let parsedData = await data.json();

            props.setProgress(70);

            // Check if parsedData.articles is an array before updating state
            if (Array.isArray(parsedData.articles)) {
                setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
                setTotalResults(parsedData.totalResults);
            }

            setLoading(false);
            props.setProgress(100);
        } catch (error) {
            console.error('Error fetching news:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = `${props.category} - NewsApp`;
        updateNews();
    }, [page]); // Update the news when the page changes

    const fetchMoreData = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
                Daily News - Top {props.category} Headlines
            </h1>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element, index) => (
                            <div className="col-md-4" key={index}>
                                <NewsItem
                                    title={element.title ? element.title.slice(0, 45) : ""}
                                    description={element.description ? element.description.slice(0, 88) : ""}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};



News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
