from flask import Flask, json
from flask_cors import CORS

app = Flask(__name__, static_url_path='')

CORS(app)


def get_stats(raw_stats):
    """
    The values are calculated for four possible choices: 'last_hour', 'today', 'yesterday', 'last_3days'
    """

    data = raw_stats.get('data')[0]
    res = dict()
    for keyword in ['last_hour', 'today', 'yesterday', 'last_3days']:
        tmp = dict(
            top_statistics={x: dict(
                name=x.capitalize(),
                average=round(data.get(f'{x}_last_3days', 0) / 3, 2),
                value=round(data.get(f'{x}_{keyword}', 0), 2) if data.get(
                    f'{x}_{keyword}') else 0
            ) for x in ['timeout', 'errors', 'zeroes']},
            top_errors=get_errors(keyword, raw_stats))
        content = dict(
            searches=dict(
                # mobile traffic
                param1=round(data.get("mobile_pessimizer", 0),
                             2) if data.get("mobile_pessimizer") else 0,
                # web traffic
                param2=round(data.get("web_pessimizer", 0), 2) if data.get(
                    "mobile_pessimizer") else 0,
            ),
            clicks=dict(
                # ctr
                param1=round(data.get(f"ctr_{keyword}", 0), 2) if data.get(
                    f"ctr_{keyword}") else 0,
                param2=None
            ),
            bookings=dict(
                # str
                param1=round(data.get(f"str_{keyword}", 0), 2) if data.get(
                    f"str_{keyword}") else 0,
                # avg_check
                param2=round(data.get(f"avg_price_{keyword}", 0), 2) if data.get(
                    f"avg_price_{keyword}") else 0
            )
        )
        for key in ['searches', 'clicks', 'bookings']:
            content[key]['current'] = round(
                data.get(f'{key}_current_{keyword}', 0), 2)
            content[key]['previous'] = round(
                data.get(f'{key}_previous_{keyword}', 0), 2)
            # добавить процент изменений по Searches, Clicks, Bookings
            diff = round((content[key]['current'] - content[key]['previous']) / content[key]['previous'], 2) \
                if content[key]['previous'] != 0 else 0
            content[key]['diff'] = f'+{diff}' if diff > 0 else diff
        tmp['content'] = content
        res[keyword] = tmp

    print(res)
    return res


def get_errors(keyword, raw_stats):
    errors = []
    for el in raw_stats:
        if el.endswith(f'_{keyword}'):

            total_count = 0
            for key in raw_stats[el]:
                tmp = dict()
                tmp['code'] = 'Other' if key['code'] is None else f'Error {key["code"]:}'
                tmp['count'] = key['count']
                errors.append(tmp)
                total_count = total_count + key['count']

        i = 0
        for error in errors:
            if i > 3:
                i = 0
            error['width'] = f'{int((error["count"] / total_count) * 100)}%'
            i = i + 1

    return errors


@app.route("/")
def index():
    return "Prosto text"


@app.route("/api/dashboard")
def api_dashboard():
    with open('dashboard_data.json') as f:
        result = json.loads(f.read())
        print(result)
        data = get_stats(result)

        response = app.response_class(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
        )

        return response


if __name__ == "__main__":
    app.run()
