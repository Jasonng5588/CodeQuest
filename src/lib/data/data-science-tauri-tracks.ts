import { StaticTrack } from "./lesson-content";

// ─── Data Science Track ────────────────────────────────────
export const DATA_SCIENCE_TRACK: StaticTrack = {
  id: "data-science",
  title: "Data Science",
  description: `End-to-end data projects. EDA, visualization, ML basics, and storytelling with data.`,
  color: "#ff6b6b",
  difficulty_curve: "advanced",
  execution_engine: "judge0",
  category: "data-science",
  order_index: 63,
  is_published: true,
  estimated_hours: 30,
  learner_count: 9800,
  units: [
    {
      id: "ds-u1", track_id: "data-science",
      title: "Data Science Fundamentals", icon: "bar-chart", order_index: 1,
      description: "EDA, feature engineering, statistical analysis, and end-to-end ML pipeline",
      lessons: [
        {
          id: "ds-u1-l1", unit_id: "ds-u1", track_id: "data-science",
          type: "concept", order_index: 1, xp_reward: 75, execution_engine: "judge0",
          title: "Exploratory Data Analysis (EDA)",
          explanation_md: `# Exploratory Data Analysis

EDA is the first step in any data project — **understand your data before modeling**.

## EDA Checklist
1. **Shape** — how many rows and columns?
2. **Types** — numeric, categorical, datetime?
3. **Missing values** — how much, which columns?
4. **Distributions** — mean, median, std, skewness
5. **Correlations** — which features relate to each other?
6. **Outliers** — extreme values that might distort models

## Python EDA Toolkit
\`\`\`python
import pandas as pd, numpy as np

df = pd.read_csv("data.csv")
print(df.shape)                           # (1000, 12)
print(df.isnull().sum())                  # missing per column
print(df.describe())                      # statistics summary
print(df["category"].value_counts())      # frequency counts
corr = df.corr()
print(corr["target"].sort_values(ascending=False))
\`\`\`

## Detecting Outliers (IQR Method)
\`\`\`python
Q1  = df["price"].quantile(0.25)
Q3  = df["price"].quantile(0.75)
IQR = Q3 - Q1
outliers = df[(df["price"] < Q1 - 1.5*IQR) | (df["price"] > Q3 + 1.5*IQR)]
\`\`\`

## Your Task
Perform EDA on a housing dataset:`,
          starter_code: `import statistics

# Housing dataset
houses = [
    {"id": 1,  "sqft": 1200, "bedrooms": 2, "price": 250000, "neighborhood": "north"},
    {"id": 2,  "sqft": 1800, "bedrooms": 3, "price": 380000, "neighborhood": "south"},
    {"id": 3,  "sqft": 950,  "bedrooms": 2, "price": 195000, "neighborhood": "east"},
    {"id": 4,  "sqft": 2400, "bedrooms": 4, "price": 520000, "neighborhood": "north"},
    {"id": 5,  "sqft": 1600, "bedrooms": 3, "price": 340000, "neighborhood": "south"},
    {"id": 6,  "sqft": 800,  "bedrooms": 1, "price": 160000, "neighborhood": "east"},
    {"id": 7,  "sqft": 3200, "bedrooms": 5, "price": 750000, "neighborhood": "north"},
    {"id": 8,  "sqft": 1400, "bedrooms": 3, "price": 290000, "neighborhood": "south"},
    {"id": 9,  "sqft": 2100, "bedrooms": 4, "price": 460000, "neighborhood": "north"},
    {"id": 10, "sqft": 1100, "bedrooms": 2, "price": 225000, "neighborhood": "east"},
]

prices = [h["price"] for h in houses]
sqfts  = [h["sqft"]  for h in houses]

# Basic statistics
print(f"Dataset: {len(houses)} houses")
mean_p   = statistics.mean(prices)
median_p = statistics.median(prices)
stdev_p  = statistics.stdev(prices)
print("Price - mean: $" + format(int(mean_p), ","))
print("Price - median: $" + format(int(median_p), ","))
print("Price - stdev: $" + format(int(stdev_p), ","))
print("Price - min: $" + format(min(prices), ",") + ", max: $" + format(max(prices), ","))

# Neighborhood breakdown
neighborhoods = {}
for h in houses:
    n = h["neighborhood"]
    if n not in neighborhoods:
        neighborhoods[n] = []
    neighborhoods[n].append(h["price"])

print("\\nAverage price by neighborhood:")
for name, prices_n in sorted(neighborhoods.items()):
    avg = int(statistics.mean(prices_n))
    print("  " + name + ": $" + format(avg, ",") + " (" + str(len(prices_n)) + " houses)")

# Correlation: sqft vs price (Pearson)
n = len(houses)
mean_s = statistics.mean(sqfts)
mean_pr = statistics.mean(prices)
std_s  = statistics.stdev(sqfts)
std_pr = statistics.stdev(prices)
cov = sum((s - mean_s) * (p - mean_pr) for s, p in zip(sqfts, prices)) / (n - 1)
corr = cov / (std_s * std_pr)
print(f"\\nCorrelation sqft vs price: {corr:.3f}")

# IQR outlier detection on price
q1 = sorted(prices)[n // 4]
q3 = sorted(prices)[3 * n // 4]
iqr = q3 - q1
outliers = [h for h in houses if h["price"] < q1 - 1.5*iqr or h["price"] > q3 + 1.5*iqr]
print(f"Outliers detected: {len(outliers)}")
for o in outliers:
    print("  House " + str(o["id"]) + ": $" + format(o["price"], ",") + " (" + str(o["sqft"]) + " sqft)")
`,
          reference_solution: `import statistics
houses=[{"id":1,"sqft":1200,"bedrooms":2,"price":250000,"neighborhood":"north"},{"id":2,"sqft":1800,"bedrooms":3,"price":380000,"neighborhood":"south"},{"id":3,"sqft":950,"bedrooms":2,"price":195000,"neighborhood":"east"},{"id":4,"sqft":2400,"bedrooms":4,"price":520000,"neighborhood":"north"},{"id":5,"sqft":1600,"bedrooms":3,"price":340000,"neighborhood":"south"},{"id":6,"sqft":800,"bedrooms":1,"price":160000,"neighborhood":"east"},{"id":7,"sqft":3200,"bedrooms":5,"price":750000,"neighborhood":"north"},{"id":8,"sqft":1400,"bedrooms":3,"price":290000,"neighborhood":"south"},{"id":9,"sqft":2100,"bedrooms":4,"price":460000,"neighborhood":"north"},{"id":10,"sqft":1100,"bedrooms":2,"price":225000,"neighborhood":"east"}]
prices=[h["price"]for h in houses];sqfts=[h["sqft"]for h in houses]
print(f"Dataset: {len(houses)} houses")
mp=statistics.mean(prices)
print("Price - mean: $"+format(int(mp),","))
print("Price - median: $"+format(int(statistics.median(prices)),","))
print("Price - stdev: $"+format(int(statistics.stdev(prices)),","))
print("Price - min: $"+format(min(prices),",")+", max: $"+format(max(prices),","))
nb={}
for h in houses:
    n=h["neighborhood"]
    if n not in nb:nb[n]=[]
    nb[n].append(h["price"])
print("\\nAverage price by neighborhood:")
for name,pn in sorted(nb.items()):print("  "+name+": $"+format(int(statistics.mean(pn)),","+" ("+str(len(pn))+" houses)"))
n=len(houses);ms=statistics.mean(sqfts);mpr=statistics.mean(prices);ss=statistics.stdev(sqfts);sp=statistics.stdev(prices)
cov=sum((s-ms)*(p-mpr)for s,p in zip(sqfts,prices))/(n-1);corr=cov/(ss*sp)
print(f"\\nCorrelation sqft vs price: {corr:.3f}")
sp2=sorted(prices);q1=sp2[n//4];q3=sp2[3*n//4];iqr=q3-q1
out=[h for h in houses if h["price"]<q1-1.5*iqr or h["price"]>q3+1.5*iqr]
print(f"Outliers detected: {len(out)}")
for o in out:print("  House "+str(o["id"])+": $"+format(o["price"],",")+" ("+str(o["sqft"])+" sqft)")
`,
          hints: [
            "10 houses, mean price around 357,000",
            "North neighborhood has the highest average price",
            "sqft vs price correlation is very high (> 0.99) — strongly linear",
            "House 7 (750,000) is the outlier — far above Q3 + 1.5*IQR",
          ],
          test_cases: [
            { description: "Dataset has 10 houses", expected_output: "Dataset: 10 houses" },
            { description: "Correlation is very high", expected_output: "Correlation sqft vs price: 0.99" },
            { description: "1 outlier detected (house 7)", expected_output: "Outliers detected: 1" },
          ],
        },
        {
          id: "ds-u1-l2", unit_id: "ds-u1", track_id: "data-science",
          type: "challenge", order_index: 2, xp_reward: 125, execution_engine: "judge0",
          title: "Feature Engineering",
          explanation_md: `# Feature Engineering

Feature engineering transforms raw data into **informative features** that improve model performance.

## Common Techniques

### 1. Encoding Categorical Variables
\`\`\`python
pd.get_dummies(df, columns=["color"])
# "red", "green", "blue" -> color_red, color_green, color_blue (0/1)

mapping = {"low": 0, "medium": 1, "high": 2}
df["priority"] = df["priority"].map(mapping)
\`\`\`

### 2. Scaling / Normalization
\`\`\`python
from sklearn.preprocessing import StandardScaler
# StandardScaler: z = (x - mean) / std -> mean=0, std=1
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
\`\`\`

### 3. Creating New Features
\`\`\`python
df["price_per_sqft"] = df["price"] / df["sqft"]
df["age_group"] = pd.cut(df["age"], bins=[0,18,35,60,100],
                         labels=["youth","adult","middle","senior"])
df["log_income"] = np.log1p(df["income"])
\`\`\`

### 4. Handling Missing Values
\`\`\`python
df["age"].fillna(df["age"].median(), inplace=True)
df["category"].fillna(df["category"].mode()[0], inplace=True)
\`\`\`

## Your Task
Apply feature engineering to a real estate dataset:`,
          starter_code: `import math

# Raw real estate data (some missing values)
raw_data = [
    {"sqft": 1200, "bedrooms": 2, "age": 15,   "neighborhood": "north", "price": 250000},
    {"sqft": 1800, "bedrooms": 3, "age": 5,    "neighborhood": "south", "price": 380000},
    {"sqft": 950,  "bedrooms": 2, "age": None, "neighborhood": "east",  "price": 195000},
    {"sqft": 2400, "bedrooms": 4, "age": 2,    "neighborhood": "north", "price": 520000},
    {"sqft": 1600, "bedrooms": 3, "age": 20,   "neighborhood": "south", "price": 340000},
    {"sqft": 800,  "bedrooms": 1, "age": 35,   "neighborhood": "east",  "price": 160000},
    {"sqft": 3200, "bedrooms": 5, "age": 1,    "neighborhood": "north", "price": 750000},
    {"sqft": 1400, "bedrooms": 3, "age": None, "neighborhood": "south", "price": 290000},
]

# Step 1: Handle missing values (fill age with median)
ages = [d["age"] for d in raw_data if d["age"] is not None]
ages_sorted = sorted(ages)
median_age = ages_sorted[len(ages_sorted) // 2]

for d in raw_data:
    if d["age"] is None:
        d["age"] = median_age

# Step 2: Create derived features
for d in raw_data:
    d["price_per_sqft"] = round(d["price"] / d["sqft"], 2)
    d["bed_density"] = round(d["bedrooms"] / (d["sqft"] / 1000), 2)
    if d["age"] < 5:
        d["age_cat"] = "new"
    elif d["age"] < 15:
        d["age_cat"] = "modern"
    else:
        d["age_cat"] = "established"
    d["log_price"] = round(math.log(d["price"]), 3)

# Step 3: Encode neighborhood (label encoding)
nb_map = {"east": 0, "south": 1, "north": 2}
for d in raw_data:
    d["nb_encoded"] = nb_map[d["neighborhood"]]

# Report
print(f"Filled missing age with median: {median_age} years")
print("\\nEngineered features for first 3 houses:")
for d in raw_data[:3]:
    print("  sqft=" + str(d["sqft"]) + ": price_per_sqft=$" + str(d["price_per_sqft"]) +
          ", age_cat=" + d["age_cat"] + ", log_price=" + str(d["log_price"]))

# Summary stats for new features
ppsf = [d["price_per_sqft"] for d in raw_data]
avg_ppsf = round(sum(ppsf) / len(ppsf), 2)
print("\\nAvg price per sqft: $" + str(avg_ppsf))

age_cats = {}
for d in raw_data:
    cat = d["age_cat"]
    age_cats[cat] = age_cats.get(cat, 0) + 1
print("Age categories:", dict(sorted(age_cats.items())))
`,
          reference_solution: `import math
raw_data=[{"sqft":1200,"bedrooms":2,"age":15,"neighborhood":"north","price":250000},{"sqft":1800,"bedrooms":3,"age":5,"neighborhood":"south","price":380000},{"sqft":950,"bedrooms":2,"age":None,"neighborhood":"east","price":195000},{"sqft":2400,"bedrooms":4,"age":2,"neighborhood":"north","price":520000},{"sqft":1600,"bedrooms":3,"age":20,"neighborhood":"south","price":340000},{"sqft":800,"bedrooms":1,"age":35,"neighborhood":"east","price":160000},{"sqft":3200,"bedrooms":5,"age":1,"neighborhood":"north","price":750000},{"sqft":1400,"bedrooms":3,"age":None,"neighborhood":"south","price":290000}]
ages=sorted([d["age"]for d in raw_data if d["age"]is not None]);med=ages[len(ages)//2]
for d in raw_data:
    if d["age"]is None:d["age"]=med
    d["price_per_sqft"]=round(d["price"]/d["sqft"],2)
    d["bed_density"]=round(d["bedrooms"]/(d["sqft"]/1000),2)
    d["age_cat"]="new"if d["age"]<5 else"modern"if d["age"]<15 else"established"
    d["log_price"]=round(math.log(d["price"]),3)
    d["nb_encoded"]={"east":0,"south":1,"north":2}[d["neighborhood"]]
print(f"Filled missing age with median: {med} years")
print("\\nEngineered features for first 3 houses:")
for d in raw_data[:3]:print("  sqft="+str(d["sqft"])+": price_per_sqft=$"+str(d["price_per_sqft"])+", age_cat="+d["age_cat"]+", log_price="+str(d["log_price"]))
ppsf=[d["price_per_sqft"]for d in raw_data]
print("\\nAvg price per sqft: $"+str(round(sum(ppsf)/len(ppsf),2)))
ac={}
for d in raw_data:ac[d["age_cat"]]=ac.get(d["age_cat"],0)+1
print("Age categories:",dict(sorted(ac.items())))
`,
          hints: [
            "Median age of [1, 2, 5, 15, 20, 35] = middle value = 10",
            "price_per_sqft for sqft=1200, price=250000 = 208.33",
            "age_cat: age<5 is new, age<15 is modern, else established",
            "Avg price per sqft across all 8 houses is about 201.83",
          ],
          test_cases: [
            { description: "Missing age filled with median 10", expected_output: "Filled missing age with median: 10 years" },
            { description: "First house price_per_sqft is $208.33", expected_output: "sqft=1200: price_per_sqft=$208.33" },
            { description: "Average price per sqft reported", expected_output: "Avg price per sqft: $" },
          ],
        },
        {
          id: "ds-u1-l3", unit_id: "ds-u1", track_id: "data-science",
          type: "challenge", order_index: 3, xp_reward: 150, execution_engine: "judge0",
          title: "Model Training & Evaluation",
          explanation_md: `# Model Training & Evaluation

## The ML Pipeline
\`\`\`
Raw Data -> EDA -> Feature Engineering -> Split -> Train -> Evaluate -> Deploy
\`\`\`

## Train/Test Split
\`\`\`python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
\`\`\`

## Regression Metrics
\`\`\`python
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error

mae  = mean_absolute_error(y_true, y_pred)
mse  = mean_squared_error(y_true, y_pred)
rmse = mse ** 0.5
r2   = r2_score(y_true, y_pred)  # 0 = bad, 1 = perfect
\`\`\`

## Classification Metrics
\`\`\`python
from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_true, y_pred)
# [[TN, FP], [FN, TP]]
precision = TP / (TP + FP)
recall    = TP / (TP + FN)
f1        = 2 * (P*R) / (P+R)
\`\`\`

## Your Task
Implement a linear regression from scratch and evaluate it:`,
          starter_code: `import math

# Simple linear regression from scratch: y = mx + b
class LinearRegression:
    def __init__(self):
        self.slope = 0
        self.intercept = 0

    def fit(self, X, y):
        n = len(X)
        mean_x = sum(X) / n
        mean_y = sum(y) / n
        numerator   = sum((X[i] - mean_x) * (y[i] - mean_y) for i in range(n))
        denominator = sum((X[i] - mean_x) ** 2 for i in range(n))
        self.slope     = numerator / denominator
        self.intercept = mean_y - self.slope * mean_x

    def predict(self, X):
        return [self.slope * x + self.intercept for x in X]

def evaluate(y_true, y_pred):
    n = len(y_true)
    mae  = sum(abs(t - p) for t, p in zip(y_true, y_pred)) / n
    mse  = sum((t - p) ** 2 for t, p in zip(y_true, y_pred)) / n
    rmse = math.sqrt(mse)
    mean_y = sum(y_true) / n
    ss_res = sum((t - p) ** 2 for t, p in zip(y_true, y_pred))
    ss_tot = sum((t - mean_y) ** 2 for t in y_true)
    r2 = 1 - (ss_res / ss_tot) if ss_tot != 0 else 0
    return {"MAE": mae, "RMSE": rmse, "R2": r2}

# Dataset: sqft -> price
sqft  = [800, 950, 1100, 1200, 1400, 1600, 1800, 2100, 2400, 3200]
price = [160000, 195000, 225000, 250000, 290000, 340000, 380000, 460000, 520000, 750000]

# Train/test split (80/20)
split = int(len(sqft) * 0.8)
X_train, X_test = sqft[:split],  sqft[split:]
y_train, y_test = price[:split], price[split:]

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

print("Trained model: price = " + str(round(model.slope, 2)) + " * sqft + " + str(round(model.intercept, 2)))

# Predict on test set
y_pred = model.predict(X_test)

print("\\nTest set predictions:")
for sqft_v, true, pred in zip(X_test, y_test, y_pred):
    err = true - pred
    print("  " + str(sqft_v) + " sqft -> actual $" + format(true, ",") +
          ", predicted $" + format(int(pred), ","))

# Evaluate
metrics = evaluate(y_test, y_pred)
print("\\nModel Performance:")
print("  MAE:  $" + format(int(metrics["MAE"]), ","))
print("  RMSE: $" + format(int(metrics["RMSE"]), ","))
print(f"  R2:   {metrics['R2']:.4f}")
`,
          reference_solution: `import math
class LinearRegression:
    def __init__(self):self.slope=0;self.intercept=0
    def fit(self,X,y):
        n=len(X);mx=sum(X)/n;my=sum(y)/n
        num=sum((X[i]-mx)*(y[i]-my)for i in range(n));den=sum((X[i]-mx)**2 for i in range(n))
        self.slope=num/den;self.intercept=my-self.slope*mx
    def predict(self,X):return[self.slope*x+self.intercept for x in X]
def evaluate(yt,yp):
    n=len(yt);mae=sum(abs(t-p)for t,p in zip(yt,yp))/n;mse=sum((t-p)**2 for t,p in zip(yt,yp))/n;rmse=math.sqrt(mse)
    my=sum(yt)/n;sr=sum((t-p)**2 for t,p in zip(yt,yp));st=sum((t-my)**2 for t in yt);r2=1-(sr/st)if st else 0
    return{"MAE":mae,"RMSE":rmse,"R2":r2}
sqft=[800,950,1100,1200,1400,1600,1800,2100,2400,3200]
price=[160000,195000,225000,250000,290000,340000,380000,460000,520000,750000]
split=int(len(sqft)*0.8);X_tr,X_te=sqft[:split],sqft[split:];y_tr,y_te=price[:split],price[split:]
m=LinearRegression();m.fit(X_tr,y_tr)
print("Trained model: price = "+str(round(m.slope,2))+" * sqft + "+str(round(m.intercept,2)))
yp=m.predict(X_te)
print("\\nTest set predictions:")
for sv,t,p in zip(X_te,y_te,yp):print("  "+str(sv)+" sqft -> actual $"+format(t,",")+", predicted $"+format(int(p),","))
mt=evaluate(y_te,yp)
print("\\nModel Performance:\\n  MAE:  $"+format(int(mt["MAE"]),",")+"\\n  RMSE: $"+format(int(mt["RMSE"]),",")+f"\\n  R2:   {mt['R2']:.4f}")
`,
          hints: [
            "Train on 8 samples (80%), test on 2 (2400 and 3200 sqft)",
            "Linear regression fits y = m*x + b using least squares",
            "High R2 (> 0.95) means the model fits well on this linear data",
          ],
          test_cases: [
            { description: "Model equation has slope and intercept", expected_output: "Trained model: price =" },
            { description: "Test predictions are shown", expected_output: "sqft -> actual $" },
            { description: "Model performance is reported", expected_output: "Model Performance:" },
          ],
        },
        {
          id: "ds-u1-l4", unit_id: "ds-u1", track_id: "data-science",
          type: "boss", order_index: 4, xp_reward: 600, execution_engine: "judge0",
          title: "Boss: End-to-End ML Pipeline",
          explanation_md: `# Boss: Complete Data Science Project

Build an end-to-end pipeline from raw data to deployed predictions:

\`\`\`
1. Load & Explore -> EDA summary
2. Clean         -> Handle missing values, outliers
3. Feature Eng.  -> Create new features, encode categories
4. Model         -> Train/test split, fit, predict
5. Evaluate      -> Metrics, interpret results
6. Insights      -> Business recommendations
\`\`\`

## The Business Problem
A real estate company wants to predict house prices to help clients price their homes correctly. Build a model that:
- Handles missing data
- Engineers informative features
- Achieves R2 > 0.90 on test set
- Provides actionable insights

## Boss Challenge
Implement the complete pipeline:`,
          starter_code: `import math, statistics

# Raw dataset with missing values
raw = [
    {"sqft":1200,"beds":2,"baths":1,"age":15,"hood":"east", "garage":0,"price":250000},
    {"sqft":1800,"beds":3,"baths":2,"age":5, "hood":"north","garage":1,"price":380000},
    {"sqft":950, "beds":2,"baths":1,"age":None,"hood":"east","garage":0,"price":195000},
    {"sqft":2400,"beds":4,"baths":3,"age":2, "hood":"north","garage":2,"price":520000},
    {"sqft":1600,"beds":3,"baths":2,"age":20,"hood":"south","garage":1,"price":340000},
    {"sqft":800, "beds":1,"baths":1,"age":35,"hood":"east", "garage":0,"price":160000},
    {"sqft":3200,"beds":5,"baths":4,"age":1, "hood":"north","garage":2,"price":750000},
    {"sqft":1400,"beds":3,"baths":2,"age":None,"hood":"south","garage":1,"price":290000},
    {"sqft":2100,"beds":4,"baths":3,"age":8, "hood":"north","garage":2,"price":460000},
    {"sqft":1100,"beds":2,"baths":1,"age":22,"hood":"east", "garage":0,"price":225000},
    {"sqft":1900,"beds":3,"baths":2,"age":6, "hood":"south","garage":1,"price":395000},
    {"sqft":2800,"beds":4,"baths":3,"age":3, "hood":"north","garage":2,"price":620000},
]

# Step 1: EDA
prices = [r["price"] for r in raw]
print("=== EDA ===")
print(f"Samples: {len(raw)}")
print("Price range: $" + format(min(prices), ",") + " to $" + format(max(prices), ","))
print("Mean price: $" + format(int(statistics.mean(prices)), ","))
missing = sum(1 for r in raw if r["age"] is None)
print(f"Missing 'age' values: {missing}")

# Step 2: Clean
med_age = statistics.median([r["age"] for r in raw if r["age"] is not None])
for r in raw:
    if r["age"] is None:
        r["age"] = med_age

# Step 3: Feature Engineering
hood_map = {"east": 0, "south": 1, "north": 2}
for r in raw:
    r["price_per_sqft"]  = r["price"] / r["sqft"]
    r["total_rooms"]     = r["beds"] + r["baths"]
    r["sqft_per_room"]   = r["sqft"] / r["total_rooms"]
    r["hood_enc"]        = hood_map[r["hood"]]
    r["is_new"]          = 1 if r["age"] <= 5 else 0
    r["log_sqft"]        = math.log(r["sqft"])

# Step 4: Simple Linear Model
def fit_linear(X, y):
    n = len(X); mx = sum(X)/n; my = sum(y)/n
    num = sum((X[i]-mx)*(y[i]-my) for i in range(n))
    den = sum((X[i]-mx)**2 for i in range(n))
    m = num/den; b = my - m*mx
    return m, b

sqfts       = [r["sqft"]  for r in raw]
prices_list = [r["price"] for r in raw]
split       = int(len(raw) * 0.75)

X_tr, X_te = sqfts[:split], sqfts[split:]
y_tr, y_te = prices_list[:split], prices_list[split:]

m, b = fit_linear(X_tr, y_tr)
y_pred = [m * x + b for x in X_te]

print("\\n=== Model ===")
print("price = " + str(round(m, 2)) + " * sqft + " + str(round(b, 2)))

# Step 5: Evaluate
mae  = sum(abs(t-p) for t,p in zip(y_te, y_pred)) / len(y_te)
rmse = math.sqrt(sum((t-p)**2 for t,p in zip(y_te, y_pred)) / len(y_te))
my   = statistics.mean(y_te)
ss_r = sum((t-p)**2 for t,p in zip(y_te, y_pred))
ss_t = sum((t-my)**2 for t in y_te)
r2   = 1 - ss_r/ss_t if ss_t else 0

print("\\n=== Evaluation ===")
print("MAE:  $" + format(int(mae), ","))
print("RMSE: $" + format(int(rmse), ","))
print(f"R2:   {r2:.4f}")
print("Model quality:", "Excellent" if r2 > 0.9 else "Good" if r2 > 0.75 else "Needs improvement")

# Step 6: Insights
print("\\n=== Business Insights ===")
avg_ppsf = statistics.mean([r["price_per_sqft"] for r in raw])
print("Avg price per sqft: $" + str(round(avg_ppsf, 2)))

by_hood = {}
for r in raw:
    by_hood.setdefault(r["hood"], []).append(r["price"])
print("Premium by neighborhood:")
for hood, ps in sorted(by_hood.items(), key=lambda x: -statistics.mean(x[1])):
    print("  " + hood + ": $" + format(int(statistics.mean(ps)), ",") + " avg")

new_ppsf = statistics.mean([r["price_per_sqft"] for r in raw if r["is_new"]])
old_ppsf = statistics.mean([r["price_per_sqft"] for r in raw if not r["is_new"]])
print("New construction premium: $" + str(round(new_ppsf - old_ppsf, 2)) + "/sqft")
`,
          reference_solution: `import math,statistics
raw=[{"sqft":1200,"beds":2,"baths":1,"age":15,"hood":"east","garage":0,"price":250000},{"sqft":1800,"beds":3,"baths":2,"age":5,"hood":"north","garage":1,"price":380000},{"sqft":950,"beds":2,"baths":1,"age":None,"hood":"east","garage":0,"price":195000},{"sqft":2400,"beds":4,"baths":3,"age":2,"hood":"north","garage":2,"price":520000},{"sqft":1600,"beds":3,"baths":2,"age":20,"hood":"south","garage":1,"price":340000},{"sqft":800,"beds":1,"baths":1,"age":35,"hood":"east","garage":0,"price":160000},{"sqft":3200,"beds":5,"baths":4,"age":1,"hood":"north","garage":2,"price":750000},{"sqft":1400,"beds":3,"baths":2,"age":None,"hood":"south","garage":1,"price":290000},{"sqft":2100,"beds":4,"baths":3,"age":8,"hood":"north","garage":2,"price":460000},{"sqft":1100,"beds":2,"baths":1,"age":22,"hood":"east","garage":0,"price":225000},{"sqft":1900,"beds":3,"baths":2,"age":6,"hood":"south","garage":1,"price":395000},{"sqft":2800,"beds":4,"baths":3,"age":3,"hood":"north","garage":2,"price":620000}]
prices=[r["price"]for r in raw]
print("=== EDA ===");print(f"Samples: {len(raw)}");print("Price range: $"+format(min(prices),",")+"-$"+format(max(prices),","));print("Mean price: $"+format(int(statistics.mean(prices)),","))
print(f"Missing 'age' values: {sum(1 for r in raw if r['age']is None)}")
med=statistics.median([r["age"]for r in raw if r["age"]is not None])
for r in raw:
    if r["age"]is None:r["age"]=med
    r["price_per_sqft"]=r["price"]/r["sqft"];r["total_rooms"]=r["beds"]+r["baths"];r["sqft_per_room"]=r["sqft"]/r["total_rooms"];r["hood_enc"]={"east":0,"south":1,"north":2}[r["hood"]];r["is_new"]=1 if r["age"]<=5 else 0;r["log_sqft"]=math.log(r["sqft"])
sqfts=[r["sqft"]for r in raw];pl=[r["price"]for r in raw];split=int(len(raw)*0.75)
Xtr,Xte=sqfts[:split],sqfts[split:];ytr,yte=pl[:split],pl[split:]
def fit(X,y):n=len(X);mx=sum(X)/n;my=sum(y)/n;num=sum((X[i]-mx)*(y[i]-my)for i in range(n));den=sum((X[i]-mx)**2 for i in range(n));m=num/den;b=my-m*mx;return m,b
m,b=fit(Xtr,ytr);yp=[m*x+b for x in Xte]
print("\\n=== Model ===");print("price = "+str(round(m,2))+" * sqft + "+str(round(b,2)))
mae=sum(abs(t-p)for t,p in zip(yte,yp))/len(yte);rmse=math.sqrt(sum((t-p)**2 for t,p in zip(yte,yp))/len(yte))
my2=statistics.mean(yte);ssr=sum((t-p)**2 for t,p in zip(yte,yp));sst=sum((t-my2)**2 for t in yte);r2=1-ssr/sst if sst else 0
print("\\n=== Evaluation ===");print("MAE:  $"+format(int(mae),","));print("RMSE: $"+format(int(rmse),","));print(f"R2:   {r2:.4f}");print("Model quality:","Excellent"if r2>0.9 else"Good"if r2>0.75 else"Needs improvement")
avg_ppsf=statistics.mean([r["price_per_sqft"]for r in raw])
print("\\n=== Business Insights ===");print("Avg price per sqft: $"+str(round(avg_ppsf,2)))
bh={}
for r in raw:bh.setdefault(r["hood"],[]).append(r["price"])
print("Premium by neighborhood:")
for h,ps in sorted(bh.items(),key=lambda x:-statistics.mean(x[1])):print("  "+h+": $"+format(int(statistics.mean(ps)),",")+" avg")
np2=statistics.mean([r["price_per_sqft"]for r in raw if r["is_new"]]);oa=statistics.mean([r["price_per_sqft"]for r in raw if not r["is_new"]])
print("New construction premium: $"+str(round(np2-oa,2))+"/sqft")
`,
          hints: [
            "2 missing age values, filled with median",
            "North neighborhood is the most expensive",
            "New construction (age 5 or less) commands a premium per sqft",
            "With only 12 data points, R2 may vary but should be high (linear data)",
          ],
          test_cases: [
            { description: "EDA shows 12 samples, 2 missing ages", expected_output: "Missing 'age' values: 2" },
            { description: "Model equation is printed", expected_output: "price = " },
            { description: "North neighborhood has highest prices", expected_output: "  north: $" },
            { description: "Business insights are computed", expected_output: "New construction premium: $" },
          ],
        },
      ],
    },
  ],
};

// ─── Tauri Track ───────────────────────────────────────────
export const TAURI_TRACK: StaticTrack = {
  id: "tauri",
  title: "Tauri",
  description: `Build desktop apps with web tech. Rust backend plus web frontend equals tiny, fast apps.`,
  color: "#ffc131",
  difficulty_curve: "advanced",
  execution_engine: "browser",
  category: "devops",
  order_index: 73,
  is_published: true,
  estimated_hours: 20,
  learner_count: 1800,
  units: [
    {
      id: "tauri-u1", track_id: "tauri",
      title: "Tauri Fundamentals", icon: "monitor", order_index: 1,
      description: "Tauri architecture, commands, IPC bridge, and file system API",
      lessons: [
        {
          id: "tauri-u1-l1", unit_id: "tauri-u1", track_id: "tauri",
          type: "concept", order_index: 1, xp_reward: 75, execution_engine: "browser",
          title: "Tauri Architecture",
          explanation_md: `# Tauri: Desktop Apps with Web Tech

Tauri is a framework for building desktop applications using:
- **Frontend** — any web framework (React, Vue, Svelte, plain HTML)
- **Backend** — Rust (safe, fast, tiny binaries)

## Architecture
\`\`\`
Tauri App
  WebView (Frontend)  <-->  Rust Backend (Commands, FS, OS APIs)
       IPC Bridge
\`\`\`

## Why Tauri over Electron?
| Feature | Tauri | Electron |
|---------|-------|----------|
| Binary size | **~3MB** | ~120MB |
| Memory usage | **~10MB** | ~100MB+ |
| Language | **Rust** | Node.js |
| Security | **Best-in-class** | Good |

## Tauri Commands (IPC)
\`\`\`rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
\`\`\`

\`\`\`js
// Frontend — invoke Rust commands via IPC
import { invoke } from '@tauri-apps/api/tauri';
const message = await invoke('greet', { name: 'World' });
\`\`\`

## Your Task
Simulate the Tauri IPC bridge between frontend and backend:`,
          starter_code: `// Simulate Tauri's IPC command system
class TauriApp {
  constructor() {
    this._commands = new Map();
    this._permissions = new Set();
    this._events = new Map();
  }

  registerCommand(name, handler) {
    this._commands.set(name, handler);
  }

  async invoke(command, args = {}) {
    if (!this._commands.has(command)) {
      throw new Error(\`Command '\${command}' not found\`);
    }
    console.log(\`[IPC] Frontend -> Rust: invoke('\${command}', \${JSON.stringify(args)})\`);
    const result = await this._commands.get(command)(args);
    console.log(\`[IPC] Rust -> Frontend: \${JSON.stringify(result)}\`);
    return result;
  }

  emit(event, payload) {
    const handlers = this._events.get(event) || [];
    handlers.forEach(h => h(payload));
  }

  listen(event, handler) {
    if (!this._events.has(event)) this._events.set(event, []);
    this._events.get(event).push(handler);
    return () => {
      const handlers = this._events.get(event);
      const index = handlers.indexOf(handler);
      if (index > -1) handlers.splice(index, 1);
    };
  }
}

const app = new TauriApp();

app.registerCommand("greet", async ({ name }) => {
  return \`Hello, \${name}! You've been greeted from Rust!\`;
});

app.registerCommand("get_system_info", async () => {
  return { os: "macOS 14.2", arch: "aarch64", appVersion: "1.0.0", tauriVersion: "2.0.0" };
});

app.registerCommand("calculate", async ({ operation, a, b }) => {
  const ops = { add: a + b, sub: a - b, mul: a * b, div: b !== 0 ? a / b : null };
  const result = ops[operation];
  if (result === null) throw new Error("Division by zero");
  return { operation, a, b, result };
});

async function main() {
  console.log("=== Tauri App Starting ===\n");

  const greeting = await app.invoke("greet", { name: "Developer" });
  console.log("Greeting:", greeting);

  const sysInfo = await app.invoke("get_system_info", {});
  console.log("System:", sysInfo.os, "(" + sysInfo.arch + ")");
  console.log("Tauri version:", sysInfo.tauriVersion);

  const calc = await app.invoke("calculate", { operation: "mul", a: 12, b: 7 });
  console.log(\`Calculation: \${calc.a} x \${calc.b} = \${calc.result}\`);

  console.log("\n=== Events ===");
  const unlisten = app.listen("download-progress", (payload) => {
    console.log(\`Download: \${payload.percent}% (\${payload.bytes} bytes)\`);
  });

  app.emit("download-progress", { percent: 25,  bytes: 256000 });
  app.emit("download-progress", { percent: 50,  bytes: 512000 });
  app.emit("download-progress", { percent: 100, bytes: 1024000 });

  unlisten();
  app.emit("download-progress", { percent: 100, bytes: 1024000 });

  console.log("\n=== Error Handling ===");
  try {
    await app.invoke("nonexistent_command", {});
  } catch (e) {
    console.log("Error caught:", e.message);
  }
}

main();
`,
          reference_solution: `class TauriApp{constructor(){this._commands=new Map();this._permissions=new Set();this._events=new Map();}
registerCommand(n,h){this._commands.set(n,h);}
async invoke(cmd,args={}){if(!this._commands.has(cmd))throw new Error(\`Command '\${cmd}' not found\`);console.log(\`[IPC] Frontend -> Rust: invoke('\${cmd}', \${JSON.stringify(args)})\`);const r=await this._commands.get(cmd)(args);console.log(\`[IPC] Rust -> Frontend: \${JSON.stringify(r)}\`);return r;}
emit(e,p){(this._events.get(e)||[]).forEach(h=>h(p));}
listen(e,h){if(!this._events.has(e))this._events.set(e,[]);this._events.get(e).push(h);return()=>{const hs=this._events.get(e);const i=hs.indexOf(h);if(i>-1)hs.splice(i,1)};}}
const app=new TauriApp();
app.registerCommand("greet",async({name})=>\`Hello, \${name}! You've been greeted from Rust!\`);
app.registerCommand("get_system_info",async()=>({os:"macOS 14.2",arch:"aarch64",appVersion:"1.0.0",tauriVersion:"2.0.0"}));
app.registerCommand("calculate",async({operation,a,b})=>{const ops={add:a+b,sub:a-b,mul:a*b,div:b!==0?a/b:null};const r=ops[operation];if(r===null)throw new Error("Division by zero");return{operation,a,b,result:r};});
(async()=>{console.log("=== Tauri App Starting ===\n");
const g=await app.invoke("greet",{name:"Developer"});console.log("Greeting:",g);
const s=await app.invoke("get_system_info",{});console.log("System:",s.os,"("+s.arch+")");console.log("Tauri version:",s.tauriVersion);
const c=await app.invoke("calculate",{operation:"mul",a:12,b:7});console.log(\`Calculation: \${c.a} x \${c.b} = \${c.result}\`);
console.log("\n=== Events ===");const ul=app.listen("download-progress",p=>console.log(\`Download: \${p.percent}% (\${p.bytes} bytes)\`));
app.emit("download-progress",{percent:25,bytes:256000});app.emit("download-progress",{percent:50,bytes:512000});app.emit("download-progress",{percent:100,bytes:1024000});
ul();app.emit("download-progress",{percent:100,bytes:1024000});
console.log("\n=== Error Handling ===");try{await app.invoke("nonexistent_command",{});}catch(e){console.log("Error caught:",e.message);}})();
`,
          hints: [
            "invoke() logs the IPC call and returns the Rust command's result",
            "12 x 7 = 84",
            "listen() returns an unlisten function — after calling it, events no longer fire the handler",
            "Invoking a non-existent command throws 'Command not found'",
          ],
          test_cases: [
            { description: "Greeting from Rust command", expected_output: "Greeting: Hello, Developer! You've been greeted from Rust!" },
            { description: "Calculation 12 x 7 = 84", expected_output: "Calculation: 12 x 7 = 84" },
            { description: "Download progress events fire then stop after unlisten", expected_output: "Download: 100% (1024000 bytes)" },
            { description: "Error caught for unknown command", expected_output: "Error caught: Command 'nonexistent_command' not found" },
          ],
        },
        {
          id: "tauri-u1-l2", unit_id: "tauri-u1", track_id: "tauri",
          type: "challenge", order_index: 2, xp_reward: 125, execution_engine: "browser",
          title: "File System & OS APIs",
          explanation_md: `# Tauri File System & OS APIs

Tauri provides secure access to the file system through a permission-based model.

## File System API
\`\`\`js
import { readTextFile, writeTextFile, readDir } from '@tauri-apps/api/fs';
import { appDataDir, homeDir } from '@tauri-apps/api/path';

const content = await readTextFile('notes.txt', {
  dir: BaseDirectory.AppData,
});

await writeTextFile('output.txt', 'Hello from Tauri!', {
  dir: BaseDirectory.Desktop,
});

const entries = await readDir('documents', {
  dir: BaseDirectory.Home,
  recursive: true,
});
\`\`\`

## Security: tauri.conf.json Allowlist
\`\`\`json
{
  "tauri": {
    "allowlist": {
      "fs": {
        "readFile": true,
        "writeFile": true,
        "scope": ["$APPDATA/*", "$HOME/Documents/**"]
      }
    }
  }
}
\`\`\`

## Your Task
Simulate a file manager built with Tauri's FS API:`,
          starter_code: `// Simulate Tauri File System API
class TauriFileSystem {
  constructor() {
    this._fs = new Map([
      ["$APPDATA/config.json",        JSON.stringify({ theme: "dark", lang: "en" })],
      ["$APPDATA/notes/todo.txt",     "Buy groceries\nCall dentist\nFinish Tauri app"],
      ["$APPDATA/notes/ideas.txt",    "Desktop app ideas:\n1. Password manager\n2. Note taking"],
      ["$HOME/Documents/report.pdf",  "<PDF BINARY>"],
      ["$HOME/Documents/readme.txt",  "Welcome to my project!"],
      ["$DESKTOP/shortcuts.txt",      "Alt+F4 = close\nCtrl+S = save"],
    ]);
    this._allowedScopes = ["$APPDATA/**", "$HOME/Documents/**", "$DESKTOP/**"];
  }

  _checkScope(path) {
    return this._allowedScopes.some(scope => {
      const prefix = scope.replace("/**", "").replace("/*", "");
      return path.startsWith(prefix);
    });
  }

  async readTextFile(path) {
    if (!this._checkScope(path)) throw new Error(\`Access denied: '\${path}' not in allowed scope\`);
    if (!this._fs.has(path)) throw new Error(\`File not found: '\${path}'\`);
    return this._fs.get(path);
  }

  async writeTextFile(path, content) {
    if (!this._checkScope(path)) throw new Error(\`Access denied: '\${path}'\`);
    this._fs.set(path, content);
    return true;
  }

  async readDir(dirPath) {
    if (!this._checkScope(dirPath + "/")) throw new Error(\`Access denied: '\${dirPath}'\`);
    const entries = [];
    for (const [path] of this._fs) {
      if (path.startsWith(dirPath + "/")) {
        const relative = path.slice(dirPath.length + 1);
        const name = relative.split("/")[0];
        const isDir = relative.includes("/");
        if (!entries.find(e => e.name === name)) {
          entries.push({ name, path: dirPath + "/" + name, isDir });
        }
      }
    }
    return entries;
  }

  async exists(path) { return this._fs.has(path); }

  async removeFile(path) {
    if (!this._checkScope(path)) throw new Error(\`Access denied: '\${path}'\`);
    if (!this._fs.has(path)) throw new Error(\`File not found: '\${path}'\`);
    this._fs.delete(path);
  }
}

const fs = new TauriFileSystem();

async function main() {
  console.log("=== Tauri File Manager ===\n");

  const config = JSON.parse(await fs.readTextFile("$APPDATA/config.json"));
  console.log("Config loaded:", JSON.stringify(config));

  const notes = await fs.readDir("$APPDATA/notes");
  console.log("\nNotes directory (" + notes.length + " files):");
  notes.forEach(e => console.log("  " + (e.isDir ? "D" : "F") + " " + e.name));

  const todo = await fs.readTextFile("$APPDATA/notes/todo.txt");
  const lines = todo.split("\n");
  console.log("\nTodo list (" + lines.length + " items):");
  lines.forEach(l => console.log("  * " + l));

  await fs.writeTextFile("$APPDATA/notes/new-note.txt", "This is a new note created by Tauri!");
  const exists = await fs.exists("$APPDATA/notes/new-note.txt");
  console.log("\nNew note created:", exists);

  config.theme = "light";
  await fs.writeTextFile("$APPDATA/config.json", JSON.stringify(config, null, 2));
  const updated = JSON.parse(await fs.readTextFile("$APPDATA/config.json"));
  console.log("Config updated, theme:", updated.theme);

  try {
    await fs.readTextFile("/etc/passwd");
  } catch (e) {
    console.log("\nSecurity blocked:", e.message.split(":")[0] + ": '/etc/passwd'");
  }
}

main();
`,
          reference_solution: `class TauriFileSystem{constructor(){this._fs=new Map([["$APPDATA/config.json",JSON.stringify({theme:"dark",lang:"en"})],["$APPDATA/notes/todo.txt","Buy groceries\nCall dentist\nFinish Tauri app"],["$APPDATA/notes/ideas.txt","Desktop app ideas:\n1. Password manager\n2. Note taking"],["$HOME/Documents/report.pdf","<PDF BINARY>"],["$HOME/Documents/readme.txt","Welcome to my project!"],["$DESKTOP/shortcuts.txt","Alt+F4 = close\nCtrl+S = save"]]);this._allowedScopes=["$APPDATA/**","$HOME/Documents/**","$DESKTOP/**"];}
_checkScope(p){return this._allowedScopes.some(s=>p.startsWith(s.replace("/**","").replace("/*","")));}
async readTextFile(p){if(!this._checkScope(p))throw new Error(\`Access denied: '\${p}' not in allowed scope\`);if(!this._fs.has(p))throw new Error(\`File not found: '\${p}'\`);return this._fs.get(p);}
async writeTextFile(p,c){if(!this._checkScope(p))throw new Error(\`Access denied: '\${p}'\`);this._fs.set(p,c);return true;}
async readDir(d){if(!this._checkScope(d+"/"))throw new Error(\`Access denied: '\${d}'\`);const e=[];for(const[p]of this._fs)if(p.startsWith(d+"/")){const r=p.slice(d.length+1),n=r.split("/")[0],id=r.includes("/");if(!e.find(x=>x.name===n))e.push({name:n,path:d+"/"+n,isDir:id});}return e;}
async exists(p){return this._fs.has(p);}
async removeFile(p){if(!this._checkScope(p))throw new Error(\`Access denied\`);if(!this._fs.has(p))throw new Error(\`File not found\`);this._fs.delete(p);}}
const fs=new TauriFileSystem();
(async()=>{console.log("=== Tauri File Manager ===\n");
const cfg=JSON.parse(await fs.readTextFile("$APPDATA/config.json"));console.log("Config loaded:",JSON.stringify(cfg));
const notes=await fs.readDir("$APPDATA/notes");console.log("\nNotes directory ("+notes.length+" files):");notes.forEach(e=>console.log("  "+(e.isDir?"D":"F")+" "+e.name));
const todo=await fs.readTextFile("$APPDATA/notes/todo.txt");const lines=todo.split("\n");console.log("\nTodo list ("+lines.length+" items):");lines.forEach(l=>console.log("  * "+l));
await fs.writeTextFile("$APPDATA/notes/new-note.txt","This is a new note created by Tauri!");console.log("\nNew note created:",await fs.exists("$APPDATA/notes/new-note.txt"));
cfg.theme="light";await fs.writeTextFile("$APPDATA/config.json",JSON.stringify(cfg,null,2));console.log("Config updated, theme:",JSON.parse(await fs.readTextFile("$APPDATA/config.json")).theme);
try{await fs.readTextFile("/etc/passwd");}catch(e){console.log("\nSecurity blocked:",e.message.split(":")[0]+": '/etc/passwd'");}})();
`,
          hints: [
            "config.json has theme: dark and lang: en",
            "notes/ directory has 2 files: ideas.txt and todo.txt",
            "todo.txt has 3 lines, so 3 items",
            "/etc/passwd is outside allowed scopes, causing Access denied",
          ],
          test_cases: [
            { description: "Config loads with dark theme", expected_output: 'Config loaded: {"theme":"dark","lang":"en"}' },
            { description: "Notes directory has 2 files", expected_output: "Notes directory (2 files):" },
            { description: "Todo list has 3 items", expected_output: "Todo list (3 items):" },
            { description: "Security blocks /etc/passwd access", expected_output: "Security blocked: Access denied: '/etc/passwd'" },
          ],
        },
        {
          id: "tauri-u1-l3", unit_id: "tauri-u1", track_id: "tauri",
          type: "challenge", order_index: 3, xp_reward: 150, execution_engine: "browser",
          title: "State Management & Updates",
          explanation_md: `# Tauri App State & Auto-Updates

## App State in Rust
\`\`\`rust
use std::sync::Mutex;

#[derive(Default)]
struct AppState {
    counter: Mutex<i32>,
    settings: Mutex<Settings>,
}

#[tauri::command]
fn increment(state: tauri::State<AppState>) -> i32 {
    let mut counter = state.counter.lock().unwrap();
    *counter += 1;
    *counter
}

fn main() {
    tauri::Builder::default()
        .manage(AppState::default())
        .invoke_handler(tauri::generate_handler![increment])
        .run(tauri::generate_context!())
        .unwrap();
}
\`\`\`

## Auto-Updater
\`\`\`js
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process';

async function checkForUpdates() {
  const { shouldUpdate, manifest } = await checkUpdate();
  if (shouldUpdate) {
    await installUpdate();
    await relaunch();
  }
}
\`\`\`

## Your Task
Simulate Tauri app state management with shared Rust state:`,
          starter_code: `// Simulate Tauri shared app state (Mutex-protected in Rust)
class RustMutex {
  constructor(initialValue) {
    this._value = initialValue;
    this._locked = false;
  }
  async lock() {
    while (this._locked) await new Promise(r => setTimeout(r, 1));
    this._locked = true;
    const guard = {
      value: this._value,
      set: (v) => { this._value = v; guard.value = v; },
      release: () => { this._locked = false; },
    };
    return guard;
  }
}

class AppState {
  constructor() {
    this.counter  = new RustMutex(0);
    this.settings = new RustMutex({ theme: "dark", language: "en", notifications: true });
    this.history  = new RustMutex([]);
  }
}

class TauriApp {
  constructor() {
    this.state = new AppState();
    this._commands = new Map();
    this._registerBuiltins();
  }

  _registerBuiltins() {
    this._commands.set("increment", async () => {
      const guard = await this.state.counter.lock();
      guard.set(guard.value + 1);
      const val = guard.value;
      guard.release();
      return val;
    });

    this._commands.set("decrement", async () => {
      const guard = await this.state.counter.lock();
      guard.set(guard.value - 1);
      const val = guard.value;
      guard.release();
      return val;
    });

    this._commands.set("get_counter", async () => {
      const guard = await this.state.counter.lock();
      const val = guard.value;
      guard.release();
      return val;
    });

    this._commands.set("update_setting", async ({ key, value }) => {
      const guard = await this.state.settings.lock();
      guard.set({ ...guard.value, [key]: value });
      const settings = { ...guard.value };
      guard.release();
      const hGuard = await this.state.history.lock();
      hGuard.set([...hGuard.value, { action: "setting_changed", key, value, ts: Date.now() }]);
      hGuard.release();
      return settings;
    });

    this._commands.set("get_settings", async () => {
      const guard = await this.state.settings.lock();
      const s = { ...guard.value };
      guard.release();
      return s;
    });

    this._commands.set("get_history", async () => {
      const guard = await this.state.history.lock();
      const h = [...guard.value];
      guard.release();
      return h;
    });
  }

  async invoke(command, args = {}) {
    const handler = this._commands.get(command);
    if (!handler) throw new Error(\`Command '\${command}' not found\`);
    return handler(args);
  }
}

async function main() {
  const app = new TauriApp();
  console.log("=== Tauri State Management ===\n");

  await app.invoke("increment");
  await app.invoke("increment");
  await app.invoke("increment");
  const count = await app.invoke("get_counter");
  console.log("Counter after 3 increments:", count);

  await app.invoke("decrement");
  const count2 = await app.invoke("get_counter");
  console.log("Counter after decrement:", count2);

  const s1 = await app.invoke("update_setting", { key: "theme", value: "light" });
  console.log("\nTheme changed to:", s1.theme);

  await app.invoke("update_setting", { key: "language", value: "zh" });
  const settings = await app.invoke("get_settings");
  console.log("Current settings:", JSON.stringify(settings));

  const history = await app.invoke("get_history");
  console.log("\nChange history (" + history.length + " events):");
  history.forEach(h => console.log("  " + h.action + ": " + h.key + " = " + h.value));
}

main();
`,
          reference_solution: `class RustMutex{constructor(v){this._value=v;this._locked=false;}async lock(){while(this._locked)await new Promise(r=>setTimeout(r,1));this._locked=true;const g={value:this._value,set:(v)=>{this._value=v;g.value=v;},release:()=>{this._locked=false;}};return g;}}
class AppState{constructor(){this.counter=new RustMutex(0);this.settings=new RustMutex({theme:"dark",language:"en",notifications:true});this.history=new RustMutex([]);}}
class TauriApp{constructor(){this.state=new AppState();this._commands=new Map();this._reg();}
_reg(){this._commands.set("increment",async()=>{const g=await this.state.counter.lock();g.set(g.value+1);const v=g.value;g.release();return v;});this._commands.set("decrement",async()=>{const g=await this.state.counter.lock();g.set(g.value-1);const v=g.value;g.release();return v;});this._commands.set("get_counter",async()=>{const g=await this.state.counter.lock();const v=g.value;g.release();return v;});this._commands.set("update_setting",async({key,value})=>{const g=await this.state.settings.lock();g.set({...g.value,[key]:value});const s={...g.value};g.release();const h=await this.state.history.lock();h.set([...h.value,{action:"setting_changed",key,value,ts:Date.now()}]);h.release();return s;});this._commands.set("get_settings",async()=>{const g=await this.state.settings.lock();const s={...g.value};g.release();return s;});this._commands.set("get_history",async()=>{const g=await this.state.history.lock();const h=[...g.value];g.release();return h;});}
async invoke(cmd,args={}){const h=this._commands.get(cmd);if(!h)throw new Error(\`Command '\${cmd}' not found\`);return h(args);}}
(async()=>{const app=new TauriApp();console.log("=== Tauri State Management ===\n");await app.invoke("increment");await app.invoke("increment");await app.invoke("increment");console.log("Counter after 3 increments:",await app.invoke("get_counter"));await app.invoke("decrement");console.log("Counter after decrement:",await app.invoke("get_counter"));const s1=await app.invoke("update_setting",{key:"theme",value:"light"});console.log("\nTheme changed to:",s1.theme);await app.invoke("update_setting",{key:"language",value:"zh"});const s=await app.invoke("get_settings");console.log("Current settings:",JSON.stringify(s));const h=await app.invoke("get_history");console.log("\nChange history ("+h.length+" events):");h.forEach(x=>console.log("  "+x.action+": "+x.key+" = "+x.value));})();
`,
          hints: [
            "3 increments gives counter = 3, 1 decrement gives counter = 2",
            "update_setting returns the full updated settings object",
            "2 settings changes means history has 2 events",
            "Final settings: theme=light, language=zh, notifications=true",
          ],
          test_cases: [
            { description: "Counter = 3 after 3 increments", expected_output: "Counter after 3 increments: 3" },
            { description: "Counter = 2 after decrement", expected_output: "Counter after decrement: 2" },
            { description: "Theme changed to light", expected_output: "Theme changed to: light" },
            { description: "History has 2 events", expected_output: "Change history (2 events):" },
          ],
        },
        {
          id: "tauri-u1-l4", unit_id: "tauri-u1", track_id: "tauri",
          type: "boss", order_index: 4, xp_reward: 600, execution_engine: "browser",
          title: "Boss: Complete Desktop App",
          explanation_md: `# Boss: Build a Complete Tauri Desktop App

Build a full-featured desktop note-taking app using Tauri patterns.

## App Requirements
- **Note CRUD** — create, read, update, delete notes
- **Persistence** — save notes to virtual file system
- **Search** — full-text search across notes
- **Tags** — categorize notes with tags
- **Auto-save** — debounced auto-save on edit
- **Export** — export notes to a single text file

## Boss Challenge
Implement the complete note app backend commands:`,
          starter_code: `// Complete Tauri Note-Taking App (boss challenge)
class NoteApp {
  constructor() {
    this._notes = new Map();
    this._nextId = 1;
  }

  createNote({ title, content = "", tags = [] }) {
    const id = this._nextId++;
    const note = {
      id,
      title: title || "Untitled Note",
      content,
      tags: [...new Set(tags)],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      wordCount: content.split(/\s+/).filter(Boolean).length,
    };
    this._notes.set(id, note);
    return { ok: true, note };
  }

  getNote(id) {
    const note = this._notes.get(id);
    if (!note) return { ok: false, error: "Note not found" };
    return { ok: true, note };
  }

  updateNote(id, { title, content, tags }) {
    const note = this._notes.get(id);
    if (!note) return { ok: false, error: "Note not found" };
    if (title !== undefined) note.title = title;
    if (content !== undefined) {
      note.content = content;
      note.wordCount = content.split(/\s+/).filter(Boolean).length;
    }
    if (tags !== undefined) {
      note.tags = [...new Set(tags)];
    }
    note.updatedAt = new Date().toISOString();
    return { ok: true, note };
  }

  deleteNote(id) {
    if (!this._notes.has(id)) return { ok: false, error: "Note not found" };
    this._notes.delete(id);
    return { ok: true };
  }

  listNotes({ tag } = {}) {
    let notes = [...this._notes.values()];
    if (tag) notes = notes.filter(n => n.tags.includes(tag));
    return {
      notes: notes.map(n => ({ id: n.id, title: n.title, tags: n.tags, wordCount: n.wordCount })),
      total: notes.length,
    };
  }

  searchNotes(query) {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const results = [];
    for (const note of this._notes.values()) {
      const text = (note.title + " " + note.content + " " + note.tags.join(" ")).toLowerCase();
      const matches = terms.filter(t => text.includes(t));
      if (matches.length > 0) {
        const rank = matches.length / terms.length;
        results.push({ id: note.id, title: note.title, rank, matchedTerms: matches });
      }
    }
    results.sort((a, b) => b.rank - a.rank);
    return { results, count: results.length };
  }

  exportAll(format = "markdown") {
    const notes = [...this._notes.values()];
    if (format === "markdown") {
      return notes.map(n =>
        "# " + n.title + "\nTags: " + (n.tags.join(", ") || "none") + "\n\n" + n.content
      ).join("\n\n---\n\n");
    }
    return JSON.stringify([...this._notes.values()], null, 2);
  }

  getStats() {
    const notes = [...this._notes.values()];
    const totalWords = notes.reduce((s, n) => s + n.wordCount, 0);
    const tagCounts = {};
    notes.forEach(n => n.tags.forEach(t => tagCounts[t] = (tagCounts[t] || 0) + 1));
    return {
      totalNotes: notes.length,
      totalWords,
      tags: Object.entries(tagCounts).sort((a, b) => b[1] - a[1]),
    };
  }
}

// Test the complete app
const app = new NoteApp();

app.createNote({ title: "Getting Started with Tauri", content: "Tauri is a framework for building desktop apps with web technologies and Rust.", tags: ["tauri", "rust", "desktop"] });
app.createNote({ title: "React Hooks Guide", content: "useState useEffect useCallback useMemo useRef are the most important React hooks.", tags: ["react", "javascript", "frontend"] });
app.createNote({ title: "Rust Ownership", content: "Every value in Rust has an owner. There can only be one owner at a time.", tags: ["rust", "programming"] });
app.createNote({ title: "Shopping List", content: "Milk eggs bread coffee apples", tags: ["personal"] });

const list = app.listNotes();
console.log("=== Notes (" + list.total + " total) ===");
list.notes.forEach(n => console.log("  [" + n.id + "] " + n.title + " (tags: " + n.tags.join(", ") + ")"));

const search = app.searchNotes("rust tauri");
console.log("\n=== Search: 'rust tauri' (" + search.count + " results) ===");
search.results.forEach(r => console.log("  [" + r.rank.toFixed(2) + "] " + r.title));

const rustNotes = app.listNotes({ tag: "rust" });
console.log("\n=== Rust-tagged notes: " + rustNotes.total + " ===");

app.updateNote(4, { content: "Milk eggs bread coffee apples bananas oranges", tags: ["personal", "shopping"] });
const updated = app.getNote(4);
console.log("\nUpdated note 4 word count:", updated.note.wordCount);

const stats = app.getStats();
console.log("\n=== App Stats ===");
console.log("Total notes:", stats.totalNotes);
console.log("Total words:", stats.totalWords);
console.log("Top tags:", stats.tags.slice(0, 3).map(([t, c]) => t + "(" + c + ")").join(", "));

const exported = app.exportAll("markdown");
const lines = exported.split("\n").length;
console.log("\nExported markdown:", lines, "lines");

app.deleteNote(4);
console.log("After delete:", app.listNotes().total, "notes remain");
`,
          reference_solution: `class NoteApp{constructor(){this._notes=new Map();this._nextId=1;}
createNote({title,content="",tags=[]}){const id=this._nextId++;const n={id,title:title||"Untitled Note",content,tags:[...new Set(tags)],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),wordCount:content.split(/\s+/).filter(Boolean).length};this._notes.set(id,n);return{ok:true,note:n};}
getNote(id){const n=this._notes.get(id);return n?{ok:true,note:n}:{ok:false,error:"Note not found"};}
updateNote(id,{title,content,tags}){const n=this._notes.get(id);if(!n)return{ok:false,error:"Note not found"};if(title!==undefined)n.title=title;if(content!==undefined){n.content=content;n.wordCount=content.split(/\s+/).filter(Boolean).length;}if(tags!==undefined)n.tags=[...new Set(tags)];n.updatedAt=new Date().toISOString();return{ok:true,note:n};}
deleteNote(id){if(!this._notes.has(id))return{ok:false,error:"Note not found"};this._notes.delete(id);return{ok:true};}
listNotes({tag}={}){let ns=[...this._notes.values()];if(tag)ns=ns.filter(n=>n.tags.includes(tag));return{notes:ns.map(n=>({id:n.id,title:n.title,tags:n.tags,wordCount:n.wordCount})),total:ns.length};}
searchNotes(q){const terms=q.toLowerCase().split(/\s+/).filter(Boolean);const r=[];for(const n of this._notes.values()){const t=(n.title+" "+n.content+" "+n.tags.join(" ")).toLowerCase();const m=terms.filter(x=>t.includes(x));if(m.length>0)r.push({id:n.id,title:n.title,rank:m.length/terms.length,matchedTerms:m});}r.sort((a,b)=>b.rank-a.rank);return{results:r,count:r.length};}
exportAll(fmt="markdown"){const ns=[...this._notes.values()];if(fmt==="markdown")return ns.map(n=>"# "+n.title+"\nTags: "+(n.tags.join(", ")||"none")+"\n\n"+n.content).join("\n\n---\n\n");return JSON.stringify(ns,null,2);}
getStats(){const ns=[...this._notes.values()];const tw=ns.reduce((s,n)=>s+n.wordCount,0);const tc={};ns.forEach(n=>n.tags.forEach(t=>tc[t]=(tc[t]||0)+1));return{totalNotes:ns.length,totalWords:tw,tags:Object.entries(tc).sort((a,b)=>b[1]-a[1])};}}
const app=new NoteApp();
app.createNote({title:"Getting Started with Tauri",content:"Tauri is a framework for building desktop apps with web technologies and Rust.",tags:["tauri","rust","desktop"]});
app.createNote({title:"React Hooks Guide",content:"useState useEffect useCallback useMemo useRef are the most important React hooks.",tags:["react","javascript","frontend"]});
app.createNote({title:"Rust Ownership",content:"Every value in Rust has an owner. There can only be one owner at a time.",tags:["rust","programming"]});
app.createNote({title:"Shopping List",content:"Milk eggs bread coffee apples",tags:["personal"]});
const list=app.listNotes();console.log("=== Notes ("+list.total+" total) ===");list.notes.forEach(n=>console.log("  ["+n.id+"] "+n.title+" (tags: "+n.tags.join(", ")+")"));
const sr=app.searchNotes("rust tauri");console.log("\n=== Search: 'rust tauri' ("+sr.count+" results) ===");sr.results.forEach(r=>console.log("  ["+r.rank.toFixed(2)+"] "+r.title));
const rn=app.listNotes({tag:"rust"});console.log("\n=== Rust-tagged notes: "+rn.total+" ===");
app.updateNote(4,{content:"Milk eggs bread coffee apples bananas oranges",tags:["personal","shopping"]});console.log("\nUpdated note 4 word count:",app.getNote(4).note.wordCount);
const st=app.getStats();console.log("\n=== App Stats ===\nTotal notes:",st.totalNotes,"\nTotal words:",st.totalWords,"\nTop tags:",st.tags.slice(0,3).map(([t,c])=>t+"("+c+")").join(", "));
const ex=app.exportAll("markdown");console.log("\nExported markdown:",ex.split("\n").length,"lines");
app.deleteNote(4);console.log("After delete:",app.listNotes().total,"notes remain");
`,
          hints: [
            "4 notes created: Tauri, React Hooks, Rust Ownership, Shopping List",
            "Search for 'rust tauri': note 1 matches both terms (rank=1.0), note 3 matches only 'rust' (rank=0.5)",
            "Rust-tagged notes: id 1 and id 3 = 2 notes",
            "Shopping list updated from 5 to 7 words",
            "After deleting note 4, 3 notes remain",
          ],
          test_cases: [
            { description: "4 notes total", expected_output: "=== Notes (4 total) ===" },
            { description: "Search finds 2 results for 'rust tauri'", expected_output: "=== Search: 'rust tauri' (2 results) ===" },
            { description: "2 rust-tagged notes", expected_output: "=== Rust-tagged notes: 2 ===" },
            { description: "Updated note has 7 words", expected_output: "Updated note 4 word count: 7" },
            { description: "3 notes remain after delete", expected_output: "After delete: 3 notes remain" },
          ],
        },
      ],
    },
  ],
};
