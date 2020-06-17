import React, { useContext, useEffect, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import LinkContext from '../../context/link/linkContext';
import Spinner from '../layout/Spinner';

const LinksPage = () => {
  const authContext = useContext(AuthContext);
  const linkContext = useContext(LinkContext);

  const { links, getLinks, loading } = linkContext;

  useEffect(()=>{
    authContext.loadUser();
    getLinks();
  //eslint-disable-next-line
  },[]);

  if(links !== null && links.length === 0 && !loading){
    return <h3 className="text-center mt-4">У вас пока нету сокрашенных ссылок</h3>
  }

  return (
    <div className="row m-3">
      {links !== null && !loading ? (<Fragment>
          {links.map(link => (
            <div className="col-md-8 offset-md-2" key={link._id}>
              <div className="card bg-info mb-5">
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item"><i className="fas fa-unlink"></i> <strong>Ваша ссылка:</strong> <a href={link.oldLink} target="_blank" rel="noopener noreferrer">{link.oldLink}</a></li>
                    <li className="list-group-item"><i className="fas fa-link"></i> <strong>Сокрашенная ссылка:</strong> <a href={link.newLink} target="_blank" rel="noopener noreferrer">{link.newLink}</a></li>
                    <li className="list-group-item"><i className="far fa-clock"></i> <strong>Дата создания:</strong> {new Date(link.date).toLocaleDateString()}</li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <i className="fas fa-mouse"> Клики</i> 
                      <span className="badge badge-success badge-pill">{link.clicks}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )).reverse()}
        </Fragment>) 
        : <Spinner />}
    </div>
  )
}

export default LinksPage;