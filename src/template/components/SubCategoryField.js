import { useField, Field } from "formik";
import { useEffect } from "react";

const SubCategoryField = () => {
  const [categoryField] = useField("category");

  useEffect(() => {}, [categoryField.value]);

  return (
    <div>
      {categoryField.value === "Guitar" ? (
        <div className="base-form-real-estate__input">
          <h4>Sub Category</h4>
          <Field type="radio" name="subCategory" value="electric guitar" />
          <label>Electric Guitar</label>

          <Field type="radio" name="subCategory" value="classic Guitar" />
          <label>Classic Guitar</label>

          <Field type="radio" name="subCategory" value="acoustic guitar" />
          <label>Acoustic Guitar</label>

          <Field type="radio" name="subCategory" value="ukelele" />
          <label>Ukelele</label>

          <Field type="radio" name="subCategory" value="guitar amp" />
          <label>Guitar Amp</label>
        </div>
      ) : categoryField.value === "Bass" ? (
        <div className="base-form-real-estate__input">
          <h4>Sub Category</h4>
          <Field type="radio" name="subCategory" value="electric bass" />
          <label>Electric Bass</label>

          <Field type="radio" name="subCategory" value="acoustic bass" />
          <label>Acoustic Bass</label>

          <Field type="radio" name="subCategory" value=" bass amp" />
          <label>Bass Amp</label>

          <Field type="radio" name="subCategory" value="string for bass" />
          <label>String for Bass</label>
        </div>
      ) : categoryField.value === "Drum" ? (
        <div className="base-form-real-estate__input">
          <h4>Sub Category</h4>

          <Field type="radio" name="subCategory" value="acoustic drum" />
          <label>Acoustic Drum</label>

          <Field type="radio" name="subCategory" value="electric drum" />
          <label>E-drum</label>

          <Field type="radio" name="subCategory" value="cymbal" />
          <label>Cymbal</label>

          <Field type="radio" name="subCategory" value="marching" />
          <label>Marching</label>

          <Field type="radio" name="subCategory" value="bag and case" />
          <label>Bag and Case</label>
        </div>
      ) : categoryField.value === "Key" ? (
        <div className="base-form-real-estate__input">
          <h4>Sub Category</h4>
          <Field type="radio" name="subCategory" value="acoustic piano" />
          <label>Acoustic Piano</label>

          <Field type="radio" name="subCategory" value="digital piano" />
          <label>Digital Piano</label>

          <Field type="radio" name="subCategory" value="keyboard" />
          <label>Keyboard</label>

          <Field type="radio" name="subCategory" value="organ" />
          <label>Organ</label>

          <Field type="radio" name="subCategory" value="accordion" />
          <label>Accordion</label>
        </div>
      ) : categoryField.value === "String" ? (
        <div className="base-form-real-estate__input">
          <h4>Sub Category</h4>
          <Field type="radio" name="subCategory" value="violin" />
          <label>Violin</label>

          <Field type="radio" name="subCategory" value="cello" />
          <label>Cello</label>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SubCategoryField;
