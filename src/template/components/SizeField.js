import { useField, Field } from "formik";
import { useEffect } from "react";

const SizeField = () => {
  const [categoryField] = useField("category");

  useEffect(() => {}, [categoryField.value]);

  return (
    <div>
      {categoryField.value === "Clothes" ? (
        <div className="base-form-real-estate__input">
          <h4>Size</h4>
          <Field type="radio" name="size" value="XS" />
          <label>XS</label>

          <Field type="radio" name="size" value="S" />
          <label>S</label>

          <Field type="radio" name="size" value="M" />
          <label>M</label>

          <Field type="radio" name="size" value="L" />
          <label>L</label>

          <Field type="radio" name="size" value="XL" />
          <label>XL</label>

          <Field type="radio" name="size" value="XL" />
          <label>XXL</label>
        </div>
      ) : categoryField.value === "Shoes" ? (
        <div className="base-form-real-estate__input ">
          <h4>Size</h4>
          <Field type="radio" name="size" value="36" />
          <label>36</label>

          <Field type="radio" name="size" value="37" />
          <label>37</label>

          <Field type="radio" name="size" value="38" />
          <label>38</label>

          <Field type="radio" name="size" value="39" />
          <label>39</label>

          <Field type="radio" name="size" value="40" />
          <label>40</label>

          <Field type="radio" name="size" value="41" />
          <label>41</label>

          <Field type="radio" name="size" value="42" />
          <label>42</label>

          <Field type="radio" name="size" value="43" />
          <label>43</label>

          <Field type="radio" name="size" value="44" />
          <label>44</label>

          <Field type="radio" name="size" value="45" />
          <label>45</label>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SizeField;
