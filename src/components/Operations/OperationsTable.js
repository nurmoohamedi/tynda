import {connect} from "react-redux";
import "./Operations.css";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import empty_playlist from '../../assets/icons/i_playlist.webp'

const getOperationColumns = (type) => {
  switch (type) {
    case 'playlist':
      return [
        '#', 'Name', 'Count', ''
      ]
    case 'users':
      return [
        '#', 'Full Name', 'Email', ''
      ]
  }
}

const OperationsTable = ({type, data, actions, deletePlaylist}) => {

  // const [columns, setColumns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // setColumns(getOperationColumns(type));
  })

  const onPlaylistClick = (id) => {
    navigate(`/playlist/${id}`)
  }

  const filterTable = () => {

  }

  return (
    <div className="table">
      {
        data && data?.length !== 0 ? (
          <table className="playlist-table">
            <thead>
            <tr>
              <th className="table-col-1" onClick={() => filterTable("id")}>#</th>
              <th onClick={() => filterTable("name")}>Name</th>
              <th onClick={() => filterTable("artist")}>Count</th>
              {/*{*/}
              {/*  columns.map(col => (*/}
              {/*    <th>{col}</th>*/}
              {/*  ))*/}
              {/*}*/}
            </tr>
            </thead>

            <tbody>
            {
              data.map(item => (
                <tr key={item.id}>
                  <td className="table-col-1"
                      onClick={() => onPlaylistClick(item.id)}
                  >{item?.id}</td>
                  <td className="table-col-2"
                      onClick={() => onPlaylistClick(item.id)}
                  >
                    <img src={item?.img_link || empty_playlist}/>
                    <p>{item?.name}</p>
                  </td>
                  <td className="table-col-3">{item?.musics.length}</td>
                  <td className="table-col-3">
                    <button className="btn btn-outlined" onClick={() => deletePlaylist(item?.id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        ) : (
          <div className="not-found">
            {
              type === 'users'
              ? <p>There's no users!</p>
              : <p>There's no music in playlist!</p>
            }
          </div>
        )
      }
    </div>
  )
}

export default connect()(OperationsTable)