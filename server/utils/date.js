// libraries
import { format } from "date-fns";

// constants
import { DATE_FORMAT } from "../constants/general.js";

export const formatDate = (date) => format(date, DATE_FORMAT);
