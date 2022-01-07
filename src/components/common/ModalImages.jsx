import { Carousel } from "react-responsive-carousel";
import { api } from "../../constants/global";

const ModalImages = ({event}) => {
  return (
    <div className="relative flex-auto">
      <div className="w-full bg-gray-100 flex">
        <div className="bg-white rounded-lg shadow-sm">
          <Carousel autoPlay width={500} dynamicHeight={20} thumbWidth={35}>
            <div>
              <img
                src={api + JSON.parse(event.images).url1}
                alt={api + JSON.parse(event.images).url1}
              />
              <p className="legend">Selfie del Conductor</p>
            </div>
            <div>
              <img
                src={api + JSON.parse(event.images).url2}
                alt={api + JSON.parse(event.images).url2}
              />
              <p className="legend">Extintor</p>
            </div>
            <div>
              <img
                src={api + JSON.parse(event.images).url3}
                alt={api + JSON.parse(event.images).url3}
              />
              <p className="legend">Delantero Izquierdo</p>
            </div>
            <div>
              <img
                src={api + JSON.parse(event.images).url4}
                alt={api + JSON.parse(event.images).url4}
              />
              <p className="legend">Delantero Derecho</p>
            </div>
            <div>
              <img
                src={api + JSON.parse(event.images).url5}
                alt={api + JSON.parse(event.images).url5}
              />
              <p className="legend">Posterior Izquiera</p>
            </div>
            <div>
              <img
                src={api + JSON.parse(event.images).url6}
                alt={api + JSON.parse(event.images).url6}
              />
              <p className="legend">Posterior Derecha</p>
            </div>
            <div>
              <img
                src={api + JSON.parse(event.images).url7}
                alt={api + JSON.parse(event.images).url7}
              />
              <p className="legend">Toma frontal de la unidad</p>
            </div>
            <div>
              <img
                src={api + JSON.parse(event.images).url8}
                alt={api + JSON.parse(event.images).url8}
              />
              <p className="legend">Toma posterior de la unidad</p>
            </div>
            <div>
              <img
                src={api + JSON.parse(event.images).url9}
                alt={api + JSON.parse(event.images).url9}
              />
              <p className="legend">Luces delanteras</p>
            </div>
            <div>
              <img
                src={api + JSON.parse(event.images).url10}
                alt={api + JSON.parse(event.images).url10}
              />
              <p className="legend">Luces posteriores</p>
            </div>
            <div>
              <img
                src={api + JSON.parse(event.images).url11}
                alt={api + JSON.parse(event.images).url11}
              />
              <p className="legend">Valvula interna</p>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default ModalImages
