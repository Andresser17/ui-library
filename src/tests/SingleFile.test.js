import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import SingleFile, {
  printTypes,
  convertToUnit,
  calcFileSize,
} from "../SingleFile";

describe("Test SingleFile props, state and styles", () => {
  describe("printTypes function", () => {
    test("if accept prop is empty return default message", () => {
      const text = printTypes();
      expect(text).toBe(`"Provide valid file formats"`);
    });

    test("if accept prop is not an array return default message", () => {
      const text = printTypes("image/png image/jpeg");
      expect(text).toBe(`"this function only accept an array like argument"`);
    });

    test("print valid accept prop", () => {
      const text = printTypes(["image/png", "image/jpeg", "image/gif"]);
      expect(text).toBe(".png, .jpeg, .gif ");
    });
  });

  describe("convertToUnit function", () => {
    test("if parameter is undefined, throw error", () => {
      expect(convertToUnit).toThrowError(
        "argument provided can't be undefined"
      );
    });

    test("if parameter is not a number, throw error", () => {
      const text = () => convertToUnit("10240");
      expect(text).toThrow("argument provided can only be a number");
    });

    test("convert bytes to kilobytes", () => {
      const text = convertToUnit(10240);
      expect(text).toBe("10KB");
    });

    test("convert bytes to megabytes", () => {
      const text = convertToUnit(2726297.6);
      expect(text).toBe("2.60MB");
    });

    test("convert bytes to gigabytes", () => {
      const text = convertToUnit(2147483648);
      expect(text).toBe("2GB");
    });
  });

  describe("calcFileSize function", () => {
    test("if parameter is undefined, throw error", () => {
      expect(calcFileSize).toThrowError("argument provided can't be undefined");
    });

    test("if parameter is not an string, throw error", () => {
      const text = () => calcFileSize(10240);
      expect(text).toThrow("argument provided can only be an string");
    });

    test("convert bytes to kilobytes", () => {
      const text = calcFileSize("10KB");
      expect(text).toBe(10240);
    });

    test("convert bytes to megabytes", () => {
      const text = calcFileSize("2.60MB");
      expect(text).toBe(2726297.6);
    });

    test("convert bytes to gigabytes", () => {
      const text = calcFileSize("2gb");
      expect(text).toBe(2147483648);
    });
  });

  describe("apply palettes classes to component", () => {
    test("apply primary", () => {
      // Primary
      render(<SingleFile />);
      // Get singleFile
      const primary = screen.getByText(/select or drag a file/i);
      const primaryCont = primary.parentElement.parentElement;
      expect(primaryCont).toHaveClass("primary");
    });

    test("apply success", () => {
      // Success
      render(<SingleFile palette="success" />);
      // Get singleFile
      const success = screen.getByText(/select or drag a file/i);
      const successCont = success.parentElement.parentElement;
      expect(successCont).toHaveClass("success");
    });

    test("apply secondary", () => {
      // Secondary
      render(<SingleFile palette="secondary" />);
      // Get singleFile
      const secondary = screen.getByText(/select or drag a file/i);
      const secondaryCont = secondary.parentElement.parentElement;
      expect(secondaryCont).toHaveClass("secondary");
    });
  });

  describe("File Input", () => {
    test("Select and upload file", async () => {
      render(
        <SingleFile
          maxFileSize="3MB"
          accept={["image/png", "image/jpeg", "image/gif"]}
        />
      );
      const file = new File(["hello"], "hello.png", { type: "image/png" });
      const input = screen.getByTestId("upload-input");

      await userEvent.upload(input, file);

      expect(input.files[0]).toBe(file);
      expect(input.files).toHaveLength(1);
    });

    test("Read File", async () => {
      render(
        <SingleFile
          maxFileSize="3MB"
          accept={["image/png", "image/jpeg", "image/gif"]}
        />
      );
      const file = new File(["hello"], "hello.png", { type: "image/png" });
      Object.defineProperty(file, "size", { value: 1258291.2 });
      const input = screen.getByTestId("upload-input");

      await userEvent.upload(input, file);

      // Get file info
      screen.getByText("hello.png");
      screen.getByText("1.20MB");
      // Select button
      screen.getByText(/select file/i);
      // Upload button
      screen.getByText(/upload/i);
      // Delete button
      screen.getByText(/delete/i);
    });

    test("If file weight is more than 1MB, display text error", async () => {
      render(
        <SingleFile
          maxFileSize="1MB"
          accept={["image/png", "image/jpeg", "image/gif"]}
        />
      );
      const file = new File([], "hello.png", {
        type: "image/png",
      });
      Object.defineProperty(file, "size", { value: 1258291.2 });
      const input = screen.getByTestId("upload-input");

      await userEvent.upload(input, file);
      // Get error text
      const singleFile = screen.getByText(/The file weight more than 1MB/i);
      expect(singleFile).toHaveClass("text-bg danger");
    });

    test("If file format is not in accept array, display text error", async () => {
      render(
        <SingleFile maxFileSize="3MB" accept={["image/jpeg", "image/gif"]} />
      );
      const file = new File(["hello"], "hello.png", { type: "image/png" });
      const input = screen.getByTestId("upload-input");

      await userEvent.upload(input, file);
      // Get error text
      const singleFile = screen.getByText(
        /image\/png file type is not accepted/i
      );
      expect(singleFile).toHaveClass("text-bg danger");
    });
  });

  describe("File Uploading", () => {
    test("Upload and delete file from server", async () => {
      let uploadData;

      const handleUpload = async (formData, setResponse) => {
        const response = await axios.post(
          "/upload-single-file",
          formData
          // {
          // onUploadProgress: (progressEvent) => {
          //   const percentCompleted = Math.round(
          //     (progressEvent.loaded * 100) / progressEvent.total
          //   );
          //   setResponse({ percent: percentCompleted });
          //   console.log(`upload process: ${percentCompleted}%`);
          // },
          // }
        );

        uploadData = response.data;
        setResponse({ data: response });
      };

      let deleteData;
      const handleDelete = async (file) => {
        const response = await axios.delete("/delete-single-file", {
          headers: {
            "Content-type": "application/json",
          },
          data: { filename: file.name },
        });

        deleteData = response.data;
      };

      render(
        <SingleFile
          maxFileSize="3MB"
          onUpload={handleUpload}
          onDelete={handleDelete}
          accept={["image/jpeg", "image/gif", "image/png"]}
        />
      );

      const file = new File(["hello"], "hello.png", { type: "image/png" });
      Object.defineProperty(file, "size", { value: 1258291.2 });
      const input = screen.getByTestId("upload-input");

      await userEvent.upload(input, file);
      // Get upload button
      const uploadButton = screen.getByRole("button", { name: /upload/i });
      // Upload file
      await userEvent.click(uploadButton);

      // Get uploading text screen.getByText(/Uploading/i);

      // Get response
      await waitFor(() =>
        expect(uploadData).toStrictEqual({
          message: `file hello.png has saved on the server`,
          url: `http://localhost:3001/hello.png`,
        })
      );

      // Get delete button
      const deleteButton = await screen.findByRole("button", {
        name: /delete file/i,
      });
      // Delete file
      await userEvent.click(deleteButton);

      // Get response
      await waitFor(() =>
        expect(deleteData).toStrictEqual({
          message: `file hello.png has been delete from server`,
          url: `http://localhost:3001/hello.png`,
        })
      );
    });

    test("Network error", async () => {
      const handleUpload = async (formData, setResponse) => {
        axios
          .post("/upload-error", formData)
          .then((response) => setResponse({ data: response }))
          .catch((err) => setResponse({ err }));
      };

      render(
        <SingleFile
          maxFileSize="3MB"
          onUpload={handleUpload}
          accept={["image/jpeg", "image/gif", "image/png"]}
        />
      );

      const file = new File(["hello"], "hello.png", { type: "image/png" });
      Object.defineProperty(file, "size", { value: 1258291.2 });
      const input = screen.getByTestId("upload-input");

      await userEvent.upload(input, file);
      // Get upload button
      const uploadButton = screen.getByRole("button", { name: /upload/i });
      // Upload file
      await userEvent.click(uploadButton);

      // Get uploading text
      screen.getByText(/Uploading/i);

      // Get error message
      const errorMessage = await screen.findByText(
        /an error has occurred, upload the file again/i
      );
      expect(errorMessage).toHaveClass("text-bg danger");
    });
  });
});
