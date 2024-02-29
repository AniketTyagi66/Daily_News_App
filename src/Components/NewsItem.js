import React from 'react'

const NewsItem = (props) => {
    
  
    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (    
      <div className='my-3'>
        <div className="card" style={{width: "18rem;"}}>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0'
        }}>
        <span className='badge rounded-pill bg-danger'> {source} </span>
        </div>
        
        <img src={!imageUrl?"https://media.assettype.com/barandbench%2F2022-11%2F67405ae7-cfff-4a34-8812-b3766d0c4c8c%2F06.jpg?w=1200&ar=40AAto=format%2Ccompress&ogImage=true&mode=crop&enlarge=true&overlay=false&overlay_position=bottom&overlay_width=100":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
        </div>
        </div>
      </div>
    )
}

export default NewsItem;
