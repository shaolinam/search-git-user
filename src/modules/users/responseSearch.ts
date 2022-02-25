import InputUser from "./inputUser";
export default interface ResponseSearch {
  total_count: number;
  incomplete_results: boolean;
  items: InputUser[];
}
