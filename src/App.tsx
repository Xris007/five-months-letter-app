
import CartaCincoMeses from './CartaCincoMeses';
import './App.css'

const App: React.FC = () => {
  return (
    <CartaCincoMeses
      nombreElla="Mi amor"
      mensaje={`Cinco meses parecen poco cuando los cuento, y un mundo entero cuando los siento.
      Gracias por las risas, por tu compañia y por hacer que cada día tibio
      se sienta como un pedacito de hogar. Te amo, hoy y todos los meses que vienen.`}
            fecha="5 meses · contigo"
    />
  );
};

export default App
