import { useEffect } from "react";

const useSelectPicker = () => {
    useEffect(() => {
      $('.selectpicker').selectpicker();
  
      return () => {
        $('.selectpicker').selectpicker('destroy');
      };
    }, []);
};

export default useSelectPicker;