// imports for react & moment for time & collections for data retrieved from db
import { useEffect, useState } from "react";
import moment from "moment";
import { Collection } from "authReactH/Collection";

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


const PieChartData = (filter) => {
  const [freeHistData, setFreeHistData] = useState({
    LabelArray: [],
    DataArray: [],
    ColorArray: [],
  });
  const [burnedHistData, setBurnedHistData] = useState({
    LabelArray: [],
    DataArray: [],
    ColorArray: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { documents } = Collection("history", ["createdAt", "desc"]);
  const [docLength, setDocLength] = useState(0);

  useEffect(() => {
    if (documents && documents.length > 0) {
      let FreeHistLabelArray = [];
      let FreeHistDataArray = [];
      let FreeHistColorArray = [];

      let BurnedHistLabelArray = [];
      let BurnedHistDataArray = [];
      let BurnedHistColorArray = [];

      documents.forEach((doc) => {
        const unix_timestamp = doc.createdAt.seconds;
        const formattedTimestamp = moment
          .unix(unix_timestamp)
          .format("MMMM D, h:mm a");
        const colorme = getRandomColor();
              

        if (doc.activity === "#yourfreehours") {
          FreeHistLabelArray.push(formattedTimestamp);
          FreeHistDataArray.push(parseInt(doc.amount));
          FreeHistColorArray.push(colorme);
        } else {
          if (
            (filter.activity === "#all" || filter.activity === doc.activity) &&
            (filter.todo === "all" || filter.todo === doc.todo)
          ) {
            BurnedHistLabelArray.push(formattedTimestamp);
            BurnedHistDataArray.push(parseInt(doc.amount));
            BurnedHistColorArray.push(colorme);
          }
        }
      });
      FreeHistLabelArray = FreeHistLabelArray.reverse();
      FreeHistDataArray = FreeHistDataArray.reverse();
      FreeHistColorArray = FreeHistColorArray.reverse();

      BurnedHistLabelArray = BurnedHistLabelArray.reverse();
      BurnedHistDataArray = BurnedHistDataArray.reverse();
      BurnedHistColorArray = BurnedHistColorArray.reverse();

      setFreeHistData({
        LabelArray: FreeHistLabelArray,
        DataArray: FreeHistDataArray,
        ColorArray: FreeHistColorArray,
      });
      setBurnedHistData({
        LabelArray: BurnedHistLabelArray,
        DataArray: BurnedHistDataArray,
        ColorArray: BurnedHistColorArray,
      });

      setIsLoading(false);
      setDocLength(documents.length);
    } else if (documents) {
      setIsLoading(false);
      setDocLength(documents.length);
    }
  }, [documents, filter]);

  const freeData = {
    labels: freeHistData.LabelArray,
    datasets: [
      {
        label: "FreeHours History",
        // backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        // backgroundColor: getRandomColor(),
        backgroundColor: freeHistData.ColorArray,
        borderWidth: 1,
        data: freeHistData.DataArray,
      },
    ],
  };

  const burnedData = {
    labels: burnedHistData.LabelArray,
    datasets: [
      {
        label: "BurnedHours History",
        // backgroundColor: "rgba(75,192,192,1)",
        backgroundColor: burnedHistData.ColorArray,
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: burnedHistData.DataArray,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return { isLoading, freeData, burnedData, options, docLength };
};

export default PieChartData;
