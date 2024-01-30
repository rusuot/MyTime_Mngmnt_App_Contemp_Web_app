// imports for react & moment for time & collections for data retrieved from db
import { useEffect, useState } from "react";
import moment from "moment";
import { Collection } from "authReactH/Collection";

// color function
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// pie chart data: label & data & random color
//  set this for both free and invested/scheduled hours
const PieChartData = (filter) => {
  // declare constant for free hours
  const [freeHistData, setFreeHistData] = useState({
    // used for pie chart labels
    LabelArray: [],
    // date in pie chart label
    DataArray: [],
    // used for random coloring
    ColorArray: [],
  });
    // declare constant for burned/scheduled hours
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
      // initialize variables with 0 for both free & invested hours
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
              

        if (doc.activity === "freetime") {
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
// free
      FreeHistLabelArray = FreeHistLabelArray.reverse();
      FreeHistDataArray = FreeHistDataArray.reverse();
      FreeHistColorArray = FreeHistColorArray.reverse();
// invested
      BurnedHistLabelArray = BurnedHistLabelArray.reverse();
      BurnedHistDataArray = BurnedHistDataArray.reverse();
      BurnedHistColorArray = BurnedHistColorArray.reverse();
// set free
      setFreeHistData({
        LabelArray: FreeHistLabelArray,
        DataArray: FreeHistDataArray,
        ColorArray: FreeHistColorArray,
      });
// set invested
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
// free
  const freeData = {
    labels: freeHistData.LabelArray,
    datasets: [
      {
        label: "FreeHours History",
        borderColor: "rgba(0,0,0,1)",
        // backgroundColor: getRandomColor(),
        backgroundColor: freeHistData.ColorArray,
        borderWidth: 1,
        data: freeHistData.DataArray,
      },
    ],
  };
// invested
  const burnedData = {
    labels: burnedHistData.LabelArray,
    datasets: [
      {
        label: "BurnedHours History",
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
