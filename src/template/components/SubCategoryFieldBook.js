import { useField, Field } from "formik";
import { useEffect } from "react";

const SubCategoryFieldMusic = () => {
  const [categoryField] = useField("category");

  useEffect(() => {}, [categoryField.value]);

  return (
    <div>
      {categoryField.value === "Book" ? (
        <div className="base-form-real-estate__input">
          <h4>Sub Category</h4>
          <Field type="radio" name="subCategory" value="Novel" />
          <label>Novel</label>

          <Field type="radio" name="subCategory" value="Romance" />
          <label>Romance</label>

          <Field type="radio" name="subCategory" value="History" />
          <label>History</label>

          <Field type="radio" name="subCategory" value="Kids" />
          <label>Kids</label>

          <Field type="radio" name="subCategory" value="Self-improvement" />
          <label>Self-improvement</label>
        </div>
      ) : categoryField.value === "Course / Exam Books" ? (
        <div className="base-form-real-estate__input">
          <h4>Sub Category</h4>
          <Field type="radio" name="subCategory" value="Exam Books" />
          <label>Exam Books</label>

          <Field type="radio" name="subCategory" value="Textbooks" />
          <label>Textbooks</label>

          <Field type="radio" name="subCategory" value="Test Books" />
          <label>Test Books</label>
        </div>
      ) : categoryField.value === "Magazine" ? (
        <div className="base-form-real-estate__input">
          <h4>Sub Category</h4>

          <Field type="radio" name="subCategory" value="Economy" />
          <label>Economy</label>

          <Field type="radio" name="subCategory" value="Humor" />
          <label>Humor</label>

          <Field type="radio" name="subCategory" value="Fashion" />
          <label>Fashion</label>

          <Field type="radio" name="subCategory" value="Car" />
          <label>Car</label>

          <Field type="radio" name="subCategory" value="Motorcycle" />
          <label>Motorcycle</label>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SubCategoryFieldMusic;
